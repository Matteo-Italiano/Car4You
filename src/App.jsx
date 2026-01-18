// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. HIER IMPORTIERST DU DEINE KOMPONENTEN
import Header from './components/Header';
import Home from './pages/Home';
import CarSelection from './pages/CarSelection';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Der Header ist immer sichtbar */}
        <Header /> 
        
        <Routes>
          {/* 2. HIER SAGST DU: WENN PFAD ist "/", ZEIGE "Home" */}
          <Route path="/" element={<Home />} />
        
          <Route path="/cars" element={<CarSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;