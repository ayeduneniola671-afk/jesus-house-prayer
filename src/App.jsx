import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import PrayerRequest from './pages/PrayerRequest.jsx'

function NotFound() {
  return (
    <main className="page-intro">
      <div className="container">
        <p className="eyebrow">JESUS HOUSE, REDEEM CHURCH</p>
        <h1>Page not found.</h1>
        <p className="page-intro__description">
          The page you are looking for may have moved. Return home to find your way.
        </p>
        <Link className="button button--primary not-found__link" to="/">
          Return to Home
        </Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/prayer-request" element={<PrayerRequest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
