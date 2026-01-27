import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import FilterableCalendar from './components/FilterableCalendar';

<<<<<<< HEAD
const Breadcrumbs = () => {
  const location = useLocation();
  // Kui tee algab /kalender, siis oleme sisevaates
  const isPersonalCalendar = location.pathname.startsWith('/kalender');

  return (
    <div className="breadcrumbs-wrapper">
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Avaleht</Link>
          <span className="separator">❯</span>
          <Link to="/" className={!isPersonalCalendar ? 'active' : ''}>Külvikalender</Link>
          {isPersonalCalendar && (
            <>
              <span className="separator">❯</span>
              <span className="active">Minu külvikalender</span>
            </>
          )}
        </nav>
=======
function smoothScrollToElement(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = window.scrollY ?? document.documentElement.scrollTop;
  const end = el.getBoundingClientRect().top + start;
  const distance = end - start;
  const duration = 1000;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (startTime == null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Külvikalender</h1>
      </header>

      <div className="content-grid">
        <div 
          className="content-section card-general"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Img/Test5.png)` }}
        >
          <div className="card-general-content">
            <h2>Üldine</h2>
            <p className="card-subtitle">Kogu informatsioon ühes kohas!</p>
            <button className="card-button" onClick={() => smoothScrollToElement('calendar')}>
              Vaata kogu külvikalendrit
            </button>
          </div>
        </div>

        <div 
          className="content-section card-personal"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Img/Test6.png)` }}
        >
          <div className="card-personal-content">
            <h2>Personaalne</h2>
            <p className="card-subtitle">Loo endale meelepärane kalender ning prindi see!</p>
            <button className="card-button" onClick={() => navigate('/kalender')}>
              Minu külvikalender
            </button>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Mis on külvikalender?</h2>
        <div className="info-text-container">
          <p>
            <b>Külvikalender on juhend või ajakava</b>, mis aitab planeerida aiatöid
            kogu kasvuperioodi jooksul. See näitab, millal on kõige sobivam aeg erinevaid
            taimi külvata, ette kasvatada, istutada, ümber istutada ja saaki koristada. 
            Külvikalender arvestab taimede kasvuvajadusi ning kohalikke ilmastiku- ja kliimatingimusi, 
            et taimed saaksid kasvada võimalikult soodsates oludes.
          </p>
          
        </div>
      </div>

      <div className="content-section product-list-wrapper">
        <ProductList />
      </div>
       
      <div id="calendar" className="content-section">
        <ActivityCalendar />
>>>>>>> a8cc70eb96da73708d8f0bc26c37b7fa3dae955b
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Breadcrumbs />
        <Routes>
          {/* Kasutame LandingPage komponenti, et mitte hoida kogu sisu App.js-is */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/kalender" element={<FilterableCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;