import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Heart, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const prayerCategories = [
  'Family and relationships',
  'Health and healing',
  'Guidance and decisions',
  'Work and provision',
  'Grief and comfort',
  'Faith and spiritual growth',
  'Other',
]

function PrayerRequest() {
  const [anonymous, setAnonymous] = useState(false)
  const [showDemoNotice, setShowDemoNotice] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setShowDemoNotice(true)
  }

  return (
    <main className="request-page">
      <section className="page-intro request-page__intro">
        <div className="container">
          <Link className="back-link" to="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to home
          </Link>
          <p className="eyebrow">A LISTENING HEART. A FAITHFUL PRAYER.</p>
          <h1>How can we <em>pray</em> for you?</h1>
          <p className="page-intro__description">
            Share only what you feel comfortable sharing. Every story matters,
            and you are welcome here.
          </p>
        </div>
      </section>

      <section className="container request-layout" aria-label="Prayer request form">
        <aside className="request-aside">
          <span className="request-aside__icon" aria-hidden="true">
            <Heart size={20} />
          </span>
          <h2>You don&apos;t have to carry it alone.</h2>
          <p>
            Whether you are facing a difficult season or giving thanks, you can
            take a moment to put your request into words.
          </p>
          <div className="privacy-card">
            <ShieldCheck size={18} aria-hidden="true" />
            <p>
              <strong>Your privacy matters.</strong> Please share only what you
              are comfortable including. This demonstration does not send or
              save anything you enter.
            </p>
          </div>
        </aside>

        <div className="request-card">
          <div className="request-card__heading">
            <p className="eyebrow">PRAYER REQUEST</p>
            <h2>Share what&apos;s on your heart</h2>
            <p>Fields marked with <span aria-hidden="true">*</span> are required.</p>
          </div>

          <div className="demo-notice" role="note">
            <strong>Demonstration only:</strong> This form is not connected to
            the church. Submitting will not deliver or store your request.
          </div>

          <form className="prayer-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="prayer-name">Name <span>(optional)</span></label>
                <input
                  autoComplete="name"
                  disabled={anonymous}
                  id="prayer-name"
                  name="name"
                  placeholder="Your name"
                  type="text"
                />
              </div>
              <div className="form-field">
                <label htmlFor="prayer-email">Email <span>(optional)</span></label>
                <input
                  autoComplete="email"
                  disabled={anonymous}
                  id="prayer-email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="prayer-category">
                Prayer category <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <select id="prayer-category" name="category" required defaultValue="">
                <option value="" disabled>Select a category</option>
                {prayerCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="prayer-message">
                Your prayer request <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <textarea
                aria-describedby="prayer-message-hint"
                id="prayer-message"
                name="message"
                placeholder="Write as much or as little as you wish..."
                rows="6"
                required
              />
              <span className="field-hint" id="prayer-message-hint">
                Please do not include information you would prefer to keep private.
              </span>
            </div>

            <label className="anonymous-option" htmlFor="prayer-anonymous">
              <input
                checked={anonymous}
                id="prayer-anonymous"
                name="anonymous"
                onChange={(event) => setAnonymous(event.target.checked)}
                type="checkbox"
              />
              <span className="anonymous-option__copy">
                <strong>I would like to remain anonymous</strong>
                <span>Your name and email fields will be disabled.</span>
              </span>
            </label>

            <button className="button button--primary prayer-form__submit" type="submit">
              Submit prayer request <ArrowUpRight size={17} aria-hidden="true" />
            </button>

            {showDemoNotice && (
              <p className="form-feedback" role="status" aria-live="polite">
                This was a demonstration only. Your request was not sent or saved.
              </p>
            )}
          </form>

          <p className="request-card__privacy">
            No prayer request information is transmitted, stored, or logged by
            this page.
          </p>
        </div>
      </section>
    </main>
  )
}

export default PrayerRequest
