import { useState } from 'react'
import { ArrowUpRight, CirclePlay, Trash2 } from 'lucide-react'

const STORAGE_KEY = 'jesus-house-prayer-videos'
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
  'youtube-nocookie.com',
])

function getVideoId(value) {
  try {
    const url = new URL(value.trim())
    const host = url.hostname.toLowerCase().replace(/^www\./, '')

    if (!['https:', 'http:'].includes(url.protocol) || !YOUTUBE_HOSTS.has(host)) {
      return null
    }

    let videoId = ''
    if (host === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] ?? ''
    } else if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') ?? ''
    } else {
      const pathMatch = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)
      videoId = pathMatch?.[1] ?? ''
    }

    return VIDEO_ID_PATTERN.test(videoId) ? videoId : null
  } catch {
    return null
  }
}

function loadSavedVideos() {
  if (typeof window === 'undefined') {
    return { videos: [], storageReady: false, error: '' }
  }

  try {
    const storedVideos = window.localStorage.getItem(STORAGE_KEY)
    const parsedVideos = storedVideos ? JSON.parse(storedVideos) : []

    if (!Array.isArray(parsedVideos) || parsedVideos.some((id) => !VIDEO_ID_PATTERN.test(id))) {
      throw new Error('Saved video list has an unexpected format.')
    }

    return {
      videos: [...new Set(parsedVideos)],
      storageReady: true,
      error: '',
    }
  } catch {
    return {
      videos: [],
      storageReady: false,
      error: 'Saved videos could not be loaded in this browser. Please check browser storage settings.',
    }
  }
}

function PrayerVideoLibrary() {
  const [library, setLibrary] = useState(loadSavedVideos)
  const [videoLink, setVideoLink] = useState('')
  const [error, setError] = useState(library.error)
  const [status, setStatus] = useState('')
  const { videos, storageReady } = library

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setStatus('')

    if (!storageReady) {
      setError('Videos cannot be saved until browser storage is available.')
      return
    }

    const videoId = getVideoId(videoLink)
    if (!videoId) {
      setError('Enter a valid YouTube video link, such as a youtube.com/watch or youtu.be link.')
      return
    }

    if (videos.includes(videoId)) {
      setError('That video is already in this browser’s list.')
      return
    }

    const updatedVideos = [videoId, ...videos]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideos))
      setLibrary((currentLibrary) => ({ ...currentLibrary, videos: updatedVideos }))
      setVideoLink('')
      setStatus('Prayer video added to this browser’s list.')
    } catch {
      setError('The video could not be saved. Check browser storage settings and try again.')
    }
  }

  function removeVideo(videoId) {
    setError('')
    setStatus('')

    const updatedVideos = videos.filter((id) => id !== videoId)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideos))
      setLibrary((currentLibrary) => ({ ...currentLibrary, videos: updatedVideos }))
      setStatus('Prayer video removed from this browser’s list.')
    } catch {
      setError('The video could not be removed. Check browser storage settings and try again.')
    }
  }

  return (
    <section className="prayer-videos" aria-labelledby="prayer-videos-title">
      <div className="container">
        <div className="prayer-videos__heading">
          <div>
            <p className="eyebrow">WATCH &amp; PRAY WITH US</p>
            <h2 id="prayer-videos-title">Prayer Videos</h2>
          </div>
          <a
            className="text-link"
            href="https://www.youtube.com/@divineinterventionprayersummit"
            target="_blank"
            rel="noreferrer"
          >
            Visit our YouTube channel <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <p className="prayer-videos__description">
          Paste a YouTube video link to add it to the list on this browser.
        </p>

        <form className="prayer-videos__form" onSubmit={handleSubmit}>
          <div className="prayer-videos__field">
            <label htmlFor="prayer-video-link">YouTube video link</label>
            <input
              autoComplete="url"
              id="prayer-video-link"
              name="videoLink"
              onChange={(event) => setVideoLink(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              type="url"
              value={videoLink}
            />
          </div>
          <button className="button button--primary prayer-videos__submit" type="submit">
            Add video <CirclePlay size={17} aria-hidden="true" />
          </button>
        </form>

        <p className="prayer-videos__notice">
          Links are saved only in this browser and are not published for other visitors. Shared site-wide posting requires a backend.
        </p>

        {error && <p className="prayer-videos__message prayer-videos__message--error" role="alert">{error}</p>}
        {status && <p className="prayer-videos__message" role="status">{status}</p>}

        {storageReady && videos.length === 0 && (
          <div className="prayer-videos__empty">
            <CirclePlay size={24} strokeWidth={1.5} aria-hidden="true" />
            <p>Your added prayer videos will appear here.</p>
          </div>
        )}

        {videos.length > 0 && (
          <div className="prayer-videos__grid">
            {videos.map((videoId) => (
              <article className="prayer-video" key={videoId}>
                <div className="prayer-video__frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title="Prayer video from Jesus House"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="prayer-video__actions">
                  <a
                    className="text-link"
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch on YouTube <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <button
                    className="prayer-video__remove"
                    onClick={() => removeVideo(videoId)}
                    type="button"
                    aria-label="Remove video from this browser’s list"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PrayerVideoLibrary
