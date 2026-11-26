import { Buffer } from 'node:buffer'
import process from 'node:process'

export const config = {
  api: {
    bodyParser: { sizeLimit: '8kb' },
  },
}

const categories = new Set([
  'Family and relationships',
  'Health and healing',
  'Guidance and decisions',
  'Work and provision',
  'Grief and comfort',
  'Faith and spiritual growth',
  'Other',
])

const requestWindowMs = 60 * 1000
const requestLimit = 5
const maxTrackedClients = 10_000
const clientRequests = new Map()

function respond(res, status, body, headers = {}) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  for (const [name, value] of Object.entries(headers)) {
    res.setHeader(name, value)
  }
  res.statusCode = status
  res.end(JSON.stringify(body))
}

function getClientKey(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  const clientIp = typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : req.socket?.remoteAddress

  return clientIp && clientIp.length <= 64 ? clientIp : 'unknown'
}

function isRateLimited(clientKey, now) {
  for (const [key, timestamps] of clientRequests) {
    const recent = timestamps.filter((timestamp) => now - timestamp < requestWindowMs)
    if (recent.length) {
      clientRequests.set(key, recent)
    } else {
      clientRequests.delete(key)
    }
  }

  const timestamps = clientRequests.get(clientKey) ?? []
  if (timestamps.length >= requestLimit) {
    return Math.ceil((timestamps[0] + requestWindowMs - now) / 1000)
  }

  if (!clientRequests.has(clientKey) && clientRequests.size >= maxTrackedClients) {
    return 60
  }

  timestamps.push(now)
  clientRequests.set(clientKey, timestamps)
  return 0
}

function cleanText(value, maxLength, allowNewlines = false) {
  if (typeof value !== 'string') return null

  const cleaned = value
    // Keep this control-character filter: prayer text may retain tabs and line breaks.
    // eslint-disable-next-line no-control-regex
    .replace(allowNewlines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
    .trim()

  return cleaned.length <= maxLength ? cleaned : null
}

function parseBody(body) {
  if (typeof body === 'string') {
    return JSON.parse(body)
  }
  return body
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return respond(res, 405, { error: 'Method not allowed.' }, { Allow: 'POST' })
  }

  if (!req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    return respond(res, 415, { error: 'Please submit your request as JSON.' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > 8_192) {
    return respond(res, 413, { error: 'Your request is too large.' })
  }

  let body
  try {
    body = parseBody(req.body)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return respond(res, 400, { error: 'Please submit a valid prayer request.' })
    }
    if (Buffer.byteLength(JSON.stringify(body), 'utf8') > 8_192) {
      return respond(res, 413, { error: 'Your request is too large.' })
    }
  } catch {
    return respond(res, 400, { error: 'Please submit a valid prayer request.' })
  }

  const anonymous = body.anonymous === true
  if (
    (body.anonymous !== undefined && typeof body.anonymous !== 'boolean') ||
    (body.name !== undefined && typeof body.name !== 'string') ||
    (body.email !== undefined && typeof body.email !== 'string')
  ) {
    return respond(res, 400, { error: 'Please submit a valid prayer request.' })
  }

  const submittedName = cleanText(body.name ?? '', 100)
  const submittedEmail = cleanText(body.email ?? '', 254)
  const name = anonymous ? '' : submittedName
  const email = anonymous ? '' : submittedEmail
  const displayName = anonymous ? 'Anonymous' : name || 'Not provided'
  const category = cleanText(body.category, 60)
  const message = cleanText(body.message, 3000, true)

  if (
    submittedName === null ||
    submittedEmail === null ||
    !category ||
    !categories.has(category) ||
    !message
  ) {
    return respond(res, 400, { error: 'Please check the required fields and try again.' })
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(res, 400, { error: 'Please enter a valid email address.' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!botToken || !chatId) {
    return respond(res, 503, { error: 'Prayer requests are temporarily unavailable. Please try again later.' })
  }

  const retryAfter = isRateLimited(getClientKey(req), Date.now())
  if (retryAfter) {
    return respond(
      res,
      429,
      { error: 'Too many requests. Please wait a moment before trying again.' },
      { 'Retry-After': String(retryAfter) },
    )
  }

  const text = [
    'NEW PRAYER REQUEST',
    '',
    `Name: ${displayName}`,
    ...(email ? [`Email: ${email}`] : []),
    `Category: ${category}`,
    `Prayer Request: ${message}`,
    '',
    'Submitted through Jesus House Prayer Summit website.',
  ].join('\n')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
        signal: controller.signal,
      },
    )
    const telegramResult = await telegramResponse.json()

    if (!telegramResponse.ok || telegramResult.ok !== true) {
      return respond(res, 502, { error: 'We could not deliver your request right now. Please try again later.' })
    }

    return respond(res, 200, { success: true })
  } catch {
    return respond(res, 502, { error: 'We could not deliver your request right now. Please try again later.' })
  } finally {
    clearTimeout(timeout)
  }
}
