import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Külvikalender</h1>
      </header>
      <div className="content-grid">
        <div className="content-section card-general">
          <h2>Üldine</h2>
          <p className="card-subtitle">Kogu informatsioon ühes kohas!</p>
          <button className="card-button">Vaata kogu külvikalendrit</button>
        </div>
        <div className="content-section card-personal">
          <h2>Personaalne</h2>
          <p className="card-subtitle">Loo endale meelepärane kalender ning prindi see!</p>
          <button className="card-button">Minu külvikalender</button>
        </div>
      </div>
      <div className="info-section">
        <h2>Mis on külvikalender?</h2>
        <p>Külvikalender on juhend või ajakava, mis aitab planeerida aiatöid kogu kasvuperioodi jooksul. See näitab, millal on kõige sobivam aeg erinevaid taimi külvata, ette kasvatada, istutada, ümber istutada ja saaki koristada. Külvikalender arvestab taimede kasvuvajadusi ning kohalikke ilmastiku- ja kliimatingimusi, et taimed saaksid kasvada võimalikult soodsates oludes.</p>
        <a href="#" className="show-more-link">Näita rohkem</a>
      </div>
      <div className="content-section"></div>
      <div className="content-section"></div>
    </div>


  );
}

export default App;
