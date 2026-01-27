import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="gardest-static-header">
      {/* Ülemine lilla riba */}
      <div className="top-bar">
        <div className="top-bar-content">
          <span className="promo-text">Hakka Gardesti ärikliendiks!</span>
          <div className="contact-info">
            <span>📞 741 2110</span>
            <span>✉️ info@gardest.ee</span>
            <span>📍 Roheline tn 14, Tartu E-R 10-19, L-P 10-18</span>
          </div>
        </div>
      </div>

      {/* Valge põhipäis */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo">gardest</div>
          <div className="search-bar">
            <input type="text" placeholder="Otsi tooteid" />
            <button className="search-btn">🔍 Otsi</button>
          </div>
          <div className="user-actions">
            <span className="wishlist">❤️ <span>0</span></span>
            <span className="login">👤 Logi sisse</span>
            <span className="cart">🛒</span>
          </div>
        </div>
        <div className="menu-categories">
            <span>☰ Tooted</span>
            <span>Toataimed</span>
            <span>Lillesibulad</span>
            <span>Seemned</span>
            <span>Lemmikloom</span>
            <span>Talvekaubad</span>
            <span>Lõpumüük</span>
            <span>Blogi</span>
            <span className="active-link">📅 Külvikalender</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;