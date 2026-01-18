import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { CARS } from '../data/cars';
import './CarSelection.css';

const CarSelection = () => {
  const location = useLocation();
  
  const searchData = location.state || JSON.parse(localStorage.getItem('car4you_search')) || {};

  const [maxPrice, setMaxPrice] = useState(120);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedGear, setSelectedGear] = useState("Alle");
  const [selectedFuel, setSelectedFuel] = useState("Alle");
  const [selectedSeats, setSelectedSeats] = useState("Alle");

  const filteredCars = CARS.filter(car => {
    const isPriceOkay = car.price <= maxPrice;
    const isCategoryOkay = selectedCategory === "Alle" || car.category === selectedCategory;
    const isGearOkay = selectedGear === "Alle" || car.gear === selectedGear;
    const isFuelOkay = selectedFuel === "Alle" || car.fuel === selectedFuel;
    const isSeatsOkay = selectedSeats === "Alle" || car.seats.toString() === selectedSeats;

    return isPriceOkay && isCategoryOkay && isGearOkay && isFuelOkay && isSeatsOkay;
  });

  return (
    <div className="selection-container">
      
      <aside className="filter-sidebar">
        <h2>Filter</h2>
        
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

        <div className="filter-group">
          <label>Getriebe</label>
          <select 
            value={selectedGear} 
            onChange={(e) => setSelectedGear(e.target.value)}
          >
            <option value="Alle">Egal</option>
            <option value="Manuell">Manuell ⚙️</option>
            <option value="Automatik">Automatik 🤖</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Antrieb</label>
          <select 
            value={selectedFuel} 
            onChange={(e) => setSelectedFuel(e.target.value)}
          >
            <option value="Alle">Egal</option>
            <option value="Benzin">Benzin ⛽</option>
            <option value="Diesel">Diesel ⛽</option>
            <option value="Elektro">Elektro ⚡</option>
            <option value="Hybrid">Hybrid 🔋</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sitze</label>
          <select 
            value={selectedSeats} 
            onChange={(e) => setSelectedSeats(e.target.value)}
          >
            <option value="Alle">Egal</option>
            <option value="2">2 Sitze</option>
            <option value="4">4 Sitze</option>
            <option value="5">5 Sitze</option>
            <option value="7">7 Sitze</option>
            <option value="9">9 Sitze</option>
          </select>
        </div>

        <div className="search-summary">
          <p>📍 Abholung: {searchData.pickupLoc || "Nicht gewählt"}</p>
          <p>📅 Datum: {searchData.startDate || "?"} bis {searchData.endDate || "?"}</p>
        </div>
      </aside>

      <main className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <div className="no-cars">
            <h3>Keine Autos gefunden 😢</h3>
            <p>Versuch, die Filter etwas lockerer einzustellen.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarSelection;