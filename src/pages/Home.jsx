import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const heroImage =
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=88'

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              <span className="eyebrow__rule" />
              A listening heart. A faithful prayer.
            </p>
            <h1>How can we <em>pray</em> for you?</h1>
            <p className="hero__description">
              Whatever you are going through, you don&apos;t have to face it alone.
              Share your prayer request with us. It would be our privilege to stand
              with you in prayer.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" to="/prayer-request">
                Submit a Prayer Request <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link className="text-link" to="/about">
                Learn About Us <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero__note">
              <span className="hero__note-mark" aria-hidden="true">✳</span>
              <span>Your request is met with care and prayer.</span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-frame">
              <img
                src={heroImage}
                alt="A raised hand in worship in a softly lit gathering"
                fetchPriority="high"
              />
            </div>
            <div className="hero__image-caption">
              <span className="hero__caption-mark" aria-hidden="true">✳</span>
              <p>There is strength in being prayed for.</p>
            </div>
            <div className="hero__image-index" aria-hidden="true">
              <span>01</span>
              <span className="hero__image-index-line" />
              <span>HOPE, HELD IN PRAYER</span>
            </div>
          </div>
        </div>
        <a className="hero__scroll" href="#prayer-ministry">
          <span>Scroll to discover</span>
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </section>

      <section className="ministry" id="prayer-ministry">
        <div className="container ministry__grid">
          <div className="ministry__intro">
            <SectionHeading
              eyebrow="PRAYER MINISTRY"
              title="You don't have to carry it alone."
              description="Life brings moments when we need someone beside us. Share what is on your heart, and our prayer team will stand with you in prayer."
            />
            <Link className="text-link text-link--dark" to="/prayer-request">
              Let us pray with you <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <blockquote className="scripture">
            <span className="scripture__ornament" aria-hidden="true">“</span>
            <p>
              The Lord is nigh unto them that are of a broken heart; and saveth
              such as be of a contrite spirit.
            </p>
            <cite>PSALM 34:18 · KING JAMES VERSION</cite>
          </blockquote>
        </div>
      </section>

      <section className="prayer-cta">
        <div className="container prayer-cta__inner">
          <div>
            <p className="eyebrow prayer-cta__eyebrow">YOU ARE NOT ALONE</p>
            <h2>There is always room for one more prayer.</h2>
          </div>
          <Link className="button button--light" to="/prayer-request">
            Share Your Request <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
