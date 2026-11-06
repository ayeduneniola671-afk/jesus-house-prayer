import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Prayer Request', to: '/prayer-request' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link className="navbar__headquarters" to="/" aria-label="RCCG headquarters home">
          <span className="navbar__headquarters-unit">
            <img
              className="navbar__headquarters-logo"
              src="/images/redeem-hq-logo.png"
              alt="RCCG headquarters logo"
            />
            <span className="navbar__headquarters-label">RCCG</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(({ label, to }) => (
            <NavLink
              key={to}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              to={to}
              onClick={closeMenu}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
          <Link className="button button--nav" to="/prayer-request" onClick={closeMenu}>
            Submit a Prayer <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>

        <Link className="navbar__main-brand" to="/" aria-label="Jesus House Prayer Summit home">
          <img
            className="navbar__main-logo"
            src="/images/jesus-house-branch-logo.jpg"
            alt="Jesus House Zonal Headquarters branch logo"
          />
          <span className="navbar__main-name">
            <span>Jesus House</span>
            <span>PRAYER SUMMIT</span>
          </span>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
