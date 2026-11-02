import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link
              className="site-footer__brand-link"
              to="/"
              aria-label="Jesus House, Redeem Church home"
            >
              <img src="/images/church-logo.jpg" alt="" aria-hidden="true" />
              <span className="site-footer__brand-name">
                <span>Jesus House</span>
                <span>Redeem Church</span>
              </span>
            </Link>
            <p>A welcoming place to share what is on your heart.</p>
          </div>

          <div className="site-footer__navigation">
            <p className="site-footer__label">Explore</p>
            <nav aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/prayer-request">Prayer Request</Link>
            </nav>
          </div>

          <div className="site-footer__invitation">
            <p className="site-footer__label">YOU ARE NOT ALONE</p>
            <h2>Let us pray with you.</h2>
            <Link className="site-footer__prayer-link" to="/prayer-request">
              Share a prayer request <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Jesus House, Redeem Church</p>
          <p>Prayer changes things. You are not alone.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
