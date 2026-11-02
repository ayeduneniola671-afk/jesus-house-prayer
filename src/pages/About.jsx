import { ArrowLeft, ArrowRight, Heart, MessageCircleHeart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const ministryValues = [
  {
    icon: Heart,
    title: 'A place to be heard',
    description:
      'Bring what is on your heart, in your own words and in your own time.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Prayer with care',
    description:
      'The prayer ministry is here to stand with you through moments of joy and challenge.',
  },
  {
    icon: Sparkles,
    title: 'Hope for every season',
    description:
      'Whether you are seeking comfort, strength, or giving thanks, your request matters.',
  },
]

function About() {
  return (
    <main className="about-page">
      <section className="page-intro about-page__intro">
        <div className="container">
          <Link className="back-link" to="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Home
          </Link>
          <p className="eyebrow">JESUS HOUSE, REDEEM CHURCH</p>
          <h1>Prayer is a way we <em>care</em>.</h1>
          <p className="page-intro__description">
            An introduction to the prayer ministry: a welcoming space to share
            what is on your heart and invite prayer into every season of life.
          </p>
        </div>
      </section>

      <section className="container about-ministry">
        <div className="about-ministry__lead">
          <p className="eyebrow">A PLACE FOR PRAYER</p>
          <h2>You are welcome to come as you are.</h2>
        </div>
        <div className="about-ministry__copy">
          <p>
            At Jesus House, Redeem Church, prayer is an invitation to pause,
            share what matters, and seek God in the middle of everyday life.
            Whatever your circumstances, you do not have to find perfect words
            before asking for prayer.
          </p>
          <p>
            This prayer request page is a simple way to put a need or a moment
            of gratitude into words. We hope it offers a gentle first step
            toward feeling supported.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-values__heading">
            <p className="eyebrow">OUR PRAYER MINISTRY</p>
            <h2>Making room for what matters.</h2>
          </div>
          <div className="about-values__grid">
            {ministryValues.map(({ icon: Icon, title, description }, index) => (
              <article className="ministry-value" key={title}>
                <span className="ministry-value__number">0{index + 1}</span>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner">
          <div>
            <p className="eyebrow">WE WOULD BE GLAD TO PRAY WITH YOU</p>
            <h2>Share what is on your heart.</h2>
          </div>
          <Link className="button button--primary" to="/prayer-request">
            Submit a Prayer Request <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About
