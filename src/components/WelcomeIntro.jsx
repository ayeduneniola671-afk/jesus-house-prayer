import { useEffect, useRef, useState } from 'react'
import './WelcomeIntro.css'

const REVEAL_DELAYS = [550, 1000, 1000, 850, 900, 750]
const AUTO_DISMISS_DELAY = 15000
const EXIT_DURATION = 700

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function WelcomeIntro({ active, onDismiss }) {
  const [stage, setStage] = useState(() => (prefersReducedMotion() ? 6 : 0))
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)
  const [isExiting, setIsExiting] = useState(false)
  const skipButtonRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = (event) => {
      setReducedMotion(event.matches)
      if (event.matches) setStage(6)
    }

    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!active || isExiting || reducedMotion || stage >= 6) return undefined

    const timeout = window.setTimeout(
      () => setStage((currentStage) => Math.min(currentStage + 1, 6)),
      REVEAL_DELAYS[stage],
    )

    return () => window.clearTimeout(timeout)
  }, [active, isExiting, reducedMotion, stage])

  useEffect(() => {
    if (!active || isExiting || stage < 6) return undefined

    const timeout = window.setTimeout(() => setIsExiting(true), AUTO_DISMISS_DELAY)
    return () => window.clearTimeout(timeout)
  }, [active, isExiting, stage])

  useEffect(() => {
    if (!active) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    skipButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  useEffect(() => {
    if (!isExiting) return undefined

    const timeout = window.setTimeout(onDismiss, reducedMotion ? 0 : EXIT_DURATION)
    return () => window.clearTimeout(timeout)
  }, [isExiting, onDismiss, reducedMotion])

  function dismiss() {
    if (isExiting) return
    if (reducedMotion) {
      onDismiss()
      return
    }
    setIsExiting(true)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      dismiss()
      return
    }

    if (event.key !== 'Tab') return

    const buttons = event.currentTarget.querySelectorAll('button:not([disabled])')
    const firstButton = buttons[0]
    const lastButton = buttons[buttons.length - 1]

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault()
      lastButton.focus()
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault()
      firstButton.focus()
    }
  }

  if (!active) return null

  return (
    <section
      className={`welcome-intro${isExiting ? ' welcome-intro--exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Jesus House Prayer Summit"
      onKeyDown={handleKeyDown}
    >
      <div className="welcome-intro__parent-brand" aria-label="RCCG">
        <img src="/images/redeem-hq-logo.png" alt="" />
        <span>RCCG</span>
      </div>

      <button
        className="welcome-intro__skip"
        ref={skipButtonRef}
        onClick={dismiss}
        type="button"
      >
        Skip Intro
      </button>

      <div className="welcome-intro__content" aria-live="polite" aria-atomic="false">
        <div className="welcome-intro__logo-frame">
          <img
            className="welcome-intro__logo"
            src="/images/jesus-house-branch-logo.jpg"
            alt="Jesus House Zonal Headquarters branch logo"
          />
        </div>

        {stage >= 1 && <p className="welcome-intro__welcome">Welcome to</p>}
        {stage >= 2 && (
          <h1 className="welcome-intro__title">
            <span>Jesus House</span>
            <span>Prayer Summit</span>
          </h1>
        )}
        {stage >= 3 && (
          <p className="welcome-intro__question">
            How can we <em>pray</em> for you?
          </p>
        )}
        {stage >= 4 && (
          <p className="welcome-intro__tagline">
            A listening heart. A faithful prayer.
          </p>
        )}
        {stage >= 5 && (
          <p className="welcome-intro__description">
            Whatever you are going through, you don&apos;t have to face it alone.
            Share your prayer request with us. It would be our privilege to
            stand with you in prayer.
          </p>
        )}
        {stage >= 6 && (
          <button
            className="welcome-intro__enter"
            onClick={dismiss}
            type="button"
          >
            Enter Website
          </button>
        )}
      </div>
    </section>
  )
}

export default WelcomeIntro
