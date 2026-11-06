import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import ChurchBrand from './ChurchBrand.jsx'

const socialPlatforms = [
  { name: 'Facebook', url: 'https://www.facebook.com/oluseyi.ademolu/' },
  { name: 'Instagram', url: 'https://www.instagram.com/oluseyiademolu.psop/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@oluseyiademolu' },
  { name: 'YouTube', url: 'https://www.youtube.com/@divineinterventionprayersummit' },
]

function SocialIcon({ platform }) {
  const iconPaths = {
    Facebook: (
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8c0-.9.3-1.6 1.6-1.6H17V3.7c-.8-.1-1.7-.2-2.6-.2-2.7 0-4.5 1.6-4.5 4.7V10H7v3h2.9v8h3.6Z" />
    ),
    Instagram: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r="0.8" className="social-icon__dot" />
      </>
    ),
    TikTok: (
      <path d="M15.5 3h-3.2v12a2.6 2.6 0 1 1-2.2-2.6v-3.3a5.9 5.9 0 1 0 5.4 5.9V9a8.2 8.2 0 0 0 4.5 1.4V7.2A5 5 0 0 1 15.5 3Z" />
    ),
    YouTube: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" className="social-icon__play" />
      </>
    ),
  }

  return (
    <svg
      className={`social-icon social-icon--${platform.toLowerCase()}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[platform]}
    </svg>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <ChurchBrand variant="footer" />
            <p>
              A welcoming way to connect with the prayer ministry at Jesus
              House, Redeem Church and share what is on your heart.
            </p>
          </div>

          <div className="site-footer__navigation">
            <p className="site-footer__label">Explore</p>
            <nav aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/prayer-request">Prayer Request</Link>
            </nav>
          </div>

          <div className="site-footer__social">
            <p className="site-footer__label">Connect with us</p>
            <ul className="site-footer__social-list">
              {socialPlatforms.map(({ name, url }) => (
                <li key={name}>
                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer">
                      <SocialIcon platform={name} />
                      <span>{name}</span>
                    </a>
                  ) : (
                    <>
                      <SocialIcon platform={name} />
                      <span>{name}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__contact">
            <p className="site-footer__label">Visit us</p>
            <address>
              <MapPin size={20} aria-hidden="true" />
              <span>
                29, Ogbe Valley Estates, Oke-Eletu Ijede Road, Ikorodu, Lagos
                State, Nigeria.
              </span>
            </address>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Jesus House, Redeem Church</p>
          <p>A place for faith, fellowship and prayer.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
