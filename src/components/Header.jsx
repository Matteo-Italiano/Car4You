// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoImg from '../assets/logo.png'; 

const Header = () => {
  return (
    <nav className="navbar">
      {/* 1. Logo (Link zur Startseite) */}
      <div className="header-logo">
        <Link to="/">
          {/* Hier benutzen wir jetzt das Bild statt Text */}
          <img src={logoImg} alt="Car4You Logo" className="logo-img" />
        </Link>
      </div>

      {/* 2. Slogan & Optionen */}
      <div className="header-right">
        <span className="slogan">Dein Auto. Dein Weg.</span>
        
        <div className="language-selector">
          <span className="globe-icon">🌐</span>
          <span className="currency">DE | CHF</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;