// src/components/CarCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleRent = () => {
    // Navigiere zum Buchungsformular (Screen 3)
    // Wir geben die Car-ID mit, damit dein Kollege weiß, welches Auto es ist
    navigate(`/book/${car.id}`, { state: { selectedCar: car } });
  };

  return (
    <div className="car-card">
      <div className="card-header">
        <h3>{car.brand} {car.model}</h3>
        <span className="category-badge">{car.category}</span>
      </div>
      
      {/* Das Bild - WICHTIG: Pfad muss stimmen! */}
      <div className="card-image">
        <img src={car.image} alt={car.model} />
      </div>

      <div className="card-details">
        <div className="detail-row">
          <span>⚙️ {car.gear}</span>
          <span>⛽ {car.fuel}</span>
          <span>💺 {car.seats} Sitze</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="price">
          <span className="amount">CHF {car.price}.-</span>
          <span className="per-day">pro Tag</span>
        </div>
        <button className="rent-btn" onClick={handleRent}>
          Mieten
        </button>
      </div>
    </div>
  );
};

export default CarCard;