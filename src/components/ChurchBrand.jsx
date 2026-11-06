import { Link } from 'react-router-dom'

function ChurchBrand({ variant = 'header', onClick }) {
  return (
    <Link
      className={`church-brand church-brand--${variant}`}
      to="/"
      aria-label="Jesus House, Redeem Church home"
      onClick={onClick}
    >
      <img
        className="church-brand__logo church-brand__logo--headquarters"
        src="/images/redeem-hq-logo.png"
        alt=""
      />
      <span className="church-brand__name">
        <span>Jesus House</span>
        <span>Redeem Church</span>
      </span>
    </Link>
  )
}

export default ChurchBrand
