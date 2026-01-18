import React, { useState, useEffect } from 'react';
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

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  useEffect(() => {
    const savedData = localStorage.getItem('car4you_search');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSearchData(parsedData);
      
      if (parsedData.pickupLoc !== parsedData.returnLoc) {
        setShowReturnLoc(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const clearField = (fieldName) => {
    setSearchData({ ...searchData, [fieldName]: '' });
  };

  const handleSearch = () => {
    if (!searchData.pickupLoc || !searchData.startDate || !searchData.endDate) {
      alert("Bitte fülle alle Pflichtfelder aus!");
      return;
    }

    const today = getTodayString();
    if (searchData.startDate < today) {
      alert("Das Abholdatum darf nicht in der Vergangenheit liegen!");
      return;
    }

    if (searchData.endDate < searchData.startDate) {
      alert("Das Rückgabedatum darf nicht vor dem Abholdatum sein!");
      return;
    }

    const finalData = {
      ...searchData,
      returnLoc: showReturnLoc ? searchData.returnLoc : searchData.pickupLoc
    };

    localStorage.setItem('car4you_search', JSON.stringify(finalData));
    
    navigate('/cars', { state: finalData });
  };

  return (
    <div className="home-container">
      <div className="search-box">
        <div className="search-inputs">
          
          <div className="location-section">
            <div className="input-group">
              <label>Abholort</label>
              <div className="input-wrapper">
                <input 
                  list="airports" 
                  name="pickupLoc" 
                  placeholder="Flughafen oder Stadt..." 
                  value={searchData.pickupLoc}
                  onChange={handleChange}
                  autoComplete="off" 
                />
                {searchData.pickupLoc && (
                  <span className="clear-btn" onClick={() => clearField('pickupLoc')}>
                    ✕
                  </span>
                )}
              </div>
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
                {/* NEU: Wrapper auch hier */}
                <div className="input-wrapper">
                  <input 
                    list="airports" 
                    name="returnLoc" 
                    placeholder="Rückgabeort wählen..." 
                    value={searchData.returnLoc}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {searchData.returnLoc && (
                    <span className="clear-btn" onClick={() => clearField('returnLoc')}>
                      ✕
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="date-section">
            <div className="input-group">
              <label>Abholdatum</label>
              <input 
                type="date" 
                name="startDate" 
                min={getTodayString()} 
                value={searchData.startDate} 
                onChange={handleChange} 
              />
            </div>

            <div className="input-group">
              <label>Rückgabe</label>
              <input 
                type="date" 
                name="endDate" 
                min={searchData.startDate || getTodayString()} 
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