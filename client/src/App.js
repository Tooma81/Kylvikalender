import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ActivityCalendar from './components/ActivityCalendar';
import FilterableCalendar from './components/FilterableCalendar';
import ProductList from './components/ProductList';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app" style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Midagi läks valesti</h1>
          <p style={{ marginTop: '1rem', color: '#64328A' }}>
            {this.state.error?.message || 'Tundmatu viga'}
          </p>
          <button
            type="button"
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Proovi uuesti
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL || ''}/Img/Test5.png)` }}
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
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL || ''}/Img/Test6.png)` }}
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
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kalender" element={<FilterableCalendar />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;