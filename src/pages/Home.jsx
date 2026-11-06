import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ChurchGallery from '../components/ChurchGallery.jsx'
import FeaturedEvent from '../components/FeaturedEvent.jsx'

const heroImage = '/images/church-gallery/photo_2_2026-11-04_21-49-35.jpg'

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
              Share your prayer request with us. It would be our privilege to
              stand with you in prayer.
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
              <span>Prayer submissions are a demonstration until a backend is connected.</span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-frame">
              <img
                src={heroImage}
                alt="A speaker at a lectern during an evening church gathering."
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

      <section className="welcome-section" aria-labelledby="welcome-title">
        <div className="container welcome-section__grid">
          <div>
            <p className="eyebrow">WELCOME</p>
            <h2 id="welcome-title">Welcome to Jesus House, Redeem Church</h2>
          </div>
          <div className="welcome-section__copy">
            <p>
              We are glad you are here. This website is a welcoming way to
              connect with the prayer ministry at Jesus House, Redeem Church
              and share what is on your heart.
            </p>
            <p>
              Rooted in faith and prayer, we value fellowship, spiritual
              encouragement and caring for one another as a community. Whether
              you are looking for support, giving thanks or simply taking a
              first step, you are welcome to reach out.
            </p>
          </div>
        </div>
      </section>

      <section
        className="prayer-platform"
        id="prayer-ministry"
        aria-labelledby="prayer-platform-title"
      >
        <div className="container prayer-platform__grid">
          <div>
            <p className="eyebrow">A SIMPLE WAY TO REACH OUT</p>
            <h2 id="prayer-platform-title">A Place Where Your Prayer Matters</h2>
          </div>
          <div className="prayer-platform__copy">
            <p>
              This platform provides a simple and welcoming way to share your
              prayer requests with Jesus House, Redeem Church. Whether you are
              seeking encouragement, praying for your family, facing challenges
              or giving thanks, you can reach out and share what&apos;s on your
              heart.
            </p>
            <Link className="button button--primary" to="/prayer-request">
              Share Your Prayer Request <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FeaturedEvent />

      <ChurchGallery />

      <section className="prayer-cta" aria-labelledby="prayer-cta-title">
        <div className="container prayer-cta__inner">
          <div>
            <p className="eyebrow prayer-cta__eyebrow">YOU ARE NOT ALONE</p>
            <h2 id="prayer-cta-title">We Would Love to Pray With You</h2>
            <p className="prayer-cta__description">
              Whatever is on your heart, you don&apos;t have to carry it alone.
              Share your request and let us stand with you in prayer.
            </p>
          </div>
          <Link className="button button--light" to="/prayer-request">
            Submit a Prayer Request <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
