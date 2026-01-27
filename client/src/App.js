import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import FilterableCalendar from './components/FilterableCalendar';


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



function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
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