// src/pages/Home.jsx
import React, { useState, useEffect } from 'react'; // <--- useEffect neu importieren
import { useNavigate } from 'react-router-dom';
import { LOCATIONS } from '../data/locations';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const [showReturnLoc, setShowReturnLoc] = useState(false);
  const [searchData, setSearchData] = useState({
    pickupLoc: '',
    returnLoc: '',
    startDate: '',
    endDate: ''
  });

  // NEU: Beim Starten der Seite prüfen, ob schon was im LocalStorage liegt
  useEffect(() => {
    const savedData = localStorage.getItem('car4you_search');
    if (savedData) {
      // Wenn ja, füllen wir das Formular damit aus
      const parsedData = JSON.parse(savedData);
      setSearchData(parsedData);
      
      // Kleines Extra: Wenn Abhol- und Rückgabeort verschieden sind,
      // zeigen wir das zweite Feld direkt an.
      if (parsedData.pickupLoc !== parsedData.returnLoc) {
        setShowReturnLoc(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    if (!searchData.pickupLoc || !searchData.startDate || !searchData.endDate) {
      alert("Bitte fülle alle Pflichtfelder aus!");
      return;
    }

    const finalData = {
      ...searchData,
      returnLoc: showReturnLoc ? searchData.returnLoc : searchData.pickupLoc
    };

    // NEU: HIER SPEICHERN WIR ES IM BROWSER!
    // Wir müssen JSON.stringify benutzen, weil LocalStorage nur Text kann.
    localStorage.setItem('car4you_search', JSON.stringify(finalData));
    
    // Trotzdem noch navigieren
    navigate('/cars', { state: finalData });
  };

  return (
    <div className="home-container">
      <div className="search-box">
        <div className="search-inputs">
          
          {/* LINKER TEIL: ORTE */}
          <div className="location-section">
            <div className="input-group">
              <label>Abholort</label>
              <input 
                list="airports" 
                name="pickupLoc" 
                placeholder="Flughafen oder Stadt..." 
                value={searchData.pickupLoc}
                onChange={handleChange}
              />
              <datalist id="airports">
                {LOCATIONS.map((loc, index) => (
                  <option key={index} value={loc} />
                ))}
              </datalist>
            </div>

            <div 
              className="toggle-return" 
              onClick={() => setShowReturnLoc(!showReturnLoc)}
            >
              {showReturnLoc ? "- Gleicher Rückgabeort" : "+ anderer Rückgabeort"}
            </div>

            {showReturnLoc && (
              <div className="input-group fade-in">
                <label>Rückgabeort</label>
                <input 
                  list="airports" 
                  name="returnLoc" 
                  placeholder="Rückgabeort wählen..." 
                  value={searchData.returnLoc}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* RECHTER TEIL: DATUM & BUTTON */}
          <div className="date-section">
            <div className="input-group">
              <label>Abholdatum</label>
              <input 
                type="date" 
                name="startDate" 
                value={searchData.startDate} 
                onChange={handleChange} 
              />
            </div>

            <div className="input-group">
              <label>Rückgabe</label>
              <input 
                type="date" 
                name="endDate" 
                value={searchData.endDate} 
                onChange={handleChange} 
              />
            </div>

            <button className="search-btn" onClick={handleSearch}>
              Autos suchen
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;