import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCalendar from './ActivityCalendar';
import ProductList from './ProductList';
import '../App.css';

function LandingPage() {
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
            <button className="card-button" onClick={() => navigate('/kalender')}>
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
        <p>Külvikalender on juhend või ajakava, mis aitab planeerida aiatöid kogu kasvuperioodi jooksul. See näitab, millal on kõige sobivam aeg erinevaid taimi külvata, ette kasvatada, istutada, ümber istutada ja saaki koristada. Külvikalender arvestab taimede kasvuvajadusi ning kohalikke ilmastiku- ja kliimatingimusi, et taimed saaksid kasvada võimalikult soodsates oludes.</p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Kuva rohkem</a>
      </div>
      <div className="content-section">
        <ProductList /> {/* Keskmine box */}
      </div>
       
      <div className="content-section">
        <ActivityCalendar />
      </div>
    </div>
  );
}

export default LandingPage;
