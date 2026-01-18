import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CARS } from "../data/cars";
import "./InsurancePage.css";

const INSURANCE_OPTIONS = [
  {
    id: "basic",
    name: "Basis-Versicherung",
    description: "Haftpflicht und Vollkasko mit CHF 2500.- Selbstbeteiligung",
    price: 0,
    coverage: ["Haftpflicht", "Vollkasko", "Selbstbeteiligung: CHF 2500"],
  },
  {
    id: "standard",
    name: "Standard-Versicherung",
    description: "Umfassender Schutz mit CHF 1000.- Selbstbeteiligung",
    price: 15,
    coverage: ["Haftpflicht", "Vollkasko", "Selbstbeteiligung: CHF 1000", "Pannenschutz"],
  },
  {
    id: "premium",
    name: "Premium-Versicherung",
    description: "Maximaler Schutz - Keine Selbstbeteiligung",
    price: 35,
    coverage: ["Haftpflicht", "Vollkasko", "Keine Selbstbeteiligung", "Pannenschutz", "Rechtsschutz"],
  },
];

const InsurancePage = () => {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCarFromState = location.state?.selectedCar;
  const selectedCarFromData = CARS.find((c) => String(c.id) === String(carId));
  const selectedCar = selectedCarFromState || selectedCarFromData;

  const [selectedInsurance, setSelectedInsurance] = useState("standard");

  useEffect(() => {
    if (!selectedCar) navigate("/cars");
  }, [selectedCar, navigate]);

  const handleContinue = () => {
    navigate(`/book/${carId}`, {
      state: {
        selectedCar: selectedCar,
        selectedInsurance: selectedInsurance,
      },
    });
  };

  if (!selectedCar) return null;

  const insurance = INSURANCE_OPTIONS.find((opt) => opt.id === selectedInsurance);

  return (
    <div className="insurance-page">
      <div className="insurance-container">
        <div className="insurance-header">
          <h1 className="insurance-title">Wählen Sie Ihre Versicherung</h1>
          <p className="insurance-subtitle">
            {selectedCar.brand} {selectedCar.model} - CHF {selectedCar.price}.- pro Tag
          </p>
        </div>

        <div className="insurance-grid">
          {INSURANCE_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`insurance-card ${selectedInsurance === option.id ? "active" : ""}`}
              onClick={() => setSelectedInsurance(option.id)}
            >
              <div className="insurance-card-header">
                <h3 className="insurance-card-title">{option.name}</h3>
                {selectedInsurance === option.id && (
                  <span className="insurance-checkmark">✓</span>
                )}
              </div>

              <p className="insurance-card-description">{option.description}</p>

              <div className="insurance-coverage">
                {option.coverage.map((item, idx) => (
                  <div key={idx} className="coverage-item">
                    <span className="coverage-icon">✓</span>
                    <span className="coverage-text">{item}</span>
                  </div>
                ))}
              </div>

              <div className="insurance-price">
                <span className="price-amount">
                  {option.price === 0 ? "Kostenlos" : `+CHF ${option.price}.-`}
                </span>
                {option.price > 0 && <span className="price-period">pro Tag</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="insurance-actions">
          <button
            className="insurance-back-btn"
            onClick={() => navigate("/cars")}
          >
            Zurück
          </button>
          <button
            className="insurance-next-btn"
            onClick={handleContinue}
          >
            Weiter zur Buchung
          </button>
        </div>

        <div className="insurance-summary">
          <div className="summary-item">
            <span className="summary-label">Fahrzeug:</span>
            <span className="summary-value">{selectedCar.brand} {selectedCar.model}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Versicherung:</span>
            <span className="summary-value">{insurance.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tägliche Kosten:</span>
            <span className="summary-value">
              CHF {selectedCar.price + insurance.price}.-
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
