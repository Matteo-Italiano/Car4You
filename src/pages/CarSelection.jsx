// src/pages/CarSelection.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { CARS } from '../data/cars'; // Deine Datenbank importieren
import './CarSelection.css';

const CarSelection = () => {
  const location = useLocation();
  
  // Wir holen die Suchdaten aus dem State (von der Home Page)
  // Falls jemand direkt per URL kommt, nehmen wir leere defaults
  const searchData = location.state || JSON.parse(localStorage.getItem('car4you_search')) || {};

  // STATE FÜR FILTER
  const [maxPrice, setMaxPrice] = useState(120); // Slider Wert
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  // HIER PASSIERT DAS FILTERN (Logik für Note 5-6!)
  const filteredCars = CARS.filter(car => {
    // 1. Preis Check
    const isPriceOkay = car.price <= maxPrice;
    // 2. Kategorie Check
    const isCategoryOkay = selectedCategory === "Alle" || car.category === selectedCategory;
    
    return isPriceOkay && isCategoryOkay;
  });

  return (
    <div className="selection-container">
      
      {/* LINKER BEREICH: FILTER (Wichtig für Aufgabe 1.5) */}
      <aside className="filter-sidebar">
        <h2>Filter</h2>
        
        {/* Der berühmte SLIDER */}
        <div className="filter-group">
          <label>Preis bis: <strong>{maxPrice} CHF</strong> / Tag</label>
          <input 
            type="range" 
            min="40" 
            max="150" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-slider"
          />
        </div>

        {/* Kategorien */}
        <div className="filter-group">
          <label>Kategorie</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Alle">Alle anzeigen</option>
            <option value="City">City</option>
            <option value="Family">Family</option>
            <option value="SUV">SUV</option>
            <option value="Sport">Sport</option>
            <option value="E-Car">E-Car</option>
          </select>
        </div>

        <div className="search-summary">
          <p>📍 Abholung: {searchData.pickupLoc || "Nicht gewählt"}</p>
          <p>📅 Datum: {searchData.startDate || "?"} bis {searchData.endDate || "?"}</p>
        </div>
      </aside>

      {/* RECHTER BEREICH: AUTO LISTE */}
      <main className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <div className="no-cars">
            <h3>Keine Autos gefunden 😢</h3>
            <p>Versuch den Preis-Regler etwas höher zu stellen.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarSelection;