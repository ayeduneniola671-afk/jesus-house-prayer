import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'

function ComingSoon({ title }) {
  return (
    <main className="deferred-page">
      <p className="eyebrow">JESUS HOUSE, REDEEM CHURCH</p>
      <h1>{title}</h1>
      <p>This page is coming soon. In the meantime, you can explore the homepage.</p>
      <Link className="button button--primary" to="/">
        Return to Home
      </Link>
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
          <Route path="/about" element={<ComingSoon title="About us" />} />
          <Route
            path="/prayer-request"
            element={<ComingSoon title="How can we pray for you?" />}
          />
          <Route path="*" element={<ComingSoon title="Page not found" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
