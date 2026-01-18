import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const state = location.state;
    if (!state || !state.car || !state.searchData) {
      navigate("/");
      return;
    }
    setBookingData(state);
  }, [location, navigate]);

  if (!bookingData) return null;

  const { car, searchData } = bookingData;
  const pickupDate = new Date(searchData.startDate).toLocaleDateString("de-CH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="success-page">
      <div className="success-video-container">
        <video
          className="success-video"
          autoPlay
          muted
          loop
          controls
        >
          <source src="/src/assets/Mann_gibt_Autoschlüssel_per_Video.mp4" type="video/mp4" />
          Ihr Browser unterstützt das Video-Tag nicht.
        </video>
      </div>

      <div className="success-content">
        <div className="success-box">
          <h1 className="success-title">Wir danken für Ihren Einkauf.</h1>

          <div className="success-details">
            <p className="success-subtitle">
              Das Auto <span className="car-name">{car.brand} {car.model}</span> wartet auf Sie am{" "}
              <span className="pickup-date">{pickupDate}</span> in{" "}
              <span className="pickup-location">{searchData.pickupLoc}</span>
            </p>
          </div>

          <div className="success-info">
            <div className="info-card">
              <div className="info-label">Fahrzeug</div>
              <div className="info-value">{car.brand} {car.model}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Abholdatum</div>
              <div className="info-value">{pickupDate}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Abholort</div>
              <div className="info-value">{searchData.pickupLoc}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Rückgabeort</div>
              <div className="info-value">{searchData.returnLoc}</div>
            </div>
          </div>

          <button
            className="success-button"
            onClick={() => {
              localStorage.removeItem("car4you_search");
              localStorage.removeItem("car4you_booking");
              navigate("/");
            }}
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
