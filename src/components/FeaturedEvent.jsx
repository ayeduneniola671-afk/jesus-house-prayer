import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
} from 'lucide-react'

function FeaturedEvent() {
  return (
    <section className="featured-event" aria-labelledby="featured-event-title">
      <div className="container">
        <div className="featured-event__heading">
          <p className="eyebrow">ON+GOING EVENT</p>
          <span>November 1st – 11th, 2026</span>
        </div>

        <div className="featured-event__card">
          <div className="featured-event__intro">
            <p className="featured-event__name">Month of Horeb Encounter</p>
            <p className="featured-event__theme-label">THEME</p>
            <h2 id="featured-event-title">Mandate of Ease</h2>
            <p className="featured-event__scripture">Acts 3:7</p>
            <a className="button button--light" href="#event-details">
              Join the Encounter <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="featured-event__information" id="event-details">
            <div className="event-detail">
              <CalendarDays size={19} aria-hidden="true" />
              <div>
                <p className="event-detail__label">Date</p>
                <p>November 1st – 11th, 2026</p>
              </div>
            </div>
            <div className="event-detail">
              <Clock3 size={19} aria-hidden="true" />
              <div>
                <p className="event-detail__label">Time</p>
                <p>12:00 AM – 12:00 PM (Midnight to Noon)</p>
              </div>
            </div>
            <div className="event-detail">
              <MapPin size={19} aria-hidden="true" />
              <div>
                <p className="event-detail__label">Venue</p>
                <p>Virtual and Physical</p>
              </div>
            </div>
            <div className="event-detail event-detail--address">
              <Navigation size={19} aria-hidden="true" />
              <div>
                <p className="event-detail__label">Physical address</p>
                <p>
                  29, Ogbe Valley Estates, Oke-Eletu Ijede Road, Ikorodu, Lagos
                  State, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedEvent
