// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoImg from '../assets/logo.png'; 

const Header = () => {
  return (
    <nav className="navbar">
      <div className="header-logo">
        <Link to="/">
          <img src={logoImg} alt="Car4You Logo" className="logo-img" />
        </Link>
      </div>

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