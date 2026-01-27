import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import FilterableCalendar from './components/FilterableCalendar';

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