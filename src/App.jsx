// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import CarSelection from './pages/CarSelection';
import BookingForm from './pages/BookingForm'; // ✅ NEU

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarSelection />} />
          <Route path="/book/:carId" element={<BookingForm />} /> {/* ✅ NEU */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
