import React from 'react';
import { useNavigate } from 'react-router-dom'; // SEE RIDA PUUDUS
import './PersonalCalendarBanner.css';

const PersonalCalendarBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="personal-calendar-banner">
      <div className="banner-inner">
        {/* Tagasi nool vasakus servas - täpselt nagu "Võib vaja minna" sektsioonis */}
        <div className="back-arrow-container" onClick={() => navigate(-1)} title="Tagasi">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#5e3587" 
            strokeWidth="1.5" /* Natuke peenem joon, et sarnaneda Gardesti nooltele */
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="back-arrow-icon"
          >
            <path d="M15 18l-6-6 6-6" /> {/* Gardesti stiilis minimalistlik noolpea */}
          </svg>
        </div>

        <div className="banner-left">
          <div className="illustration-container">
            <img 
              src="/Img/Kalender/ettekasvatus_suur.png" 
              alt="Taim illustratsioon" 
              className="illustration-img" 
            />
          </div>
          <div className="banner-text">
            <h1>Minu külvikalender,</h1>
            <p>minu aed, minu reeglid!</p>
            <div className="banner-actions">
              <button className="btn-purple">Prindi kohe!</button>
              <button className="btn-purple-outline">Vali taimed</button>
            </div>
          </div>
        </div>
        
        <div className="banner-right">
          <img src="/Img/Test6.png" alt="Kalendri näidis" className="banner-photo" />
        </div>
      </div>
    </div>
  );
};

export default PersonalCalendarBanner;