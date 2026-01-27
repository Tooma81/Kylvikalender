import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ActivityCalendar from './components/ActivityCalendar';
import FilterableCalendar from './components/FilterableCalendar';
import ProductList from './components/ProductList';

function HomePage() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="info-text-container">
          <p>
            <b>Külvikalender on juhend või ajakava</b>, mis aitab planeerida aiatöid
            kogu kasvuperioodi jooksul. See näitab, millal on kõige sobivam aeg erinevaid
            taimi külvata, ette kasvatada, istutada, ümber istutada ja saaki koristada. 
            Külvikalender arvestab taimede kasvuvajadusi ning kohalikke ilmastiku- ja kliimatingimusi, 
            et taimed saaksid kasvada võimalikult soodsates oludes.
          </p>
          
          <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
            <p>
              Külvikalendri <b>põhieesmärk on aidata aednikul valida õige aeg külviks</b>, 
              sest liiga vara külvatud taimed võivad kannatada külma käes ja liiga hilja 
              külvatud taimed ei pruugi jõuda enne sügist saaki anda.
              Paljudes külvikalendrites on eraldi välja toodud, millal külvata seemned toas ette, 
              millal istutada taimed kasvuhoonesse ning millal külvata või istutada otse avamaale.
            </p>
          </div>
          
          <button 
            className="read-more-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Näita vähem' : 'Näita rohkem'}
          </button>
        </div>
      </div>

      <div className="content-section product-list-wrapper">
        <ProductList />
      </div>
       
      <div className="content-section">
        <ActivityCalendar />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kalender" element={<FilterableCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;