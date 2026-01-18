import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CARS } from "../data/cars";
import SummaryBox from "../components/SummaryBox.jsx";
import "./BookingForm.css";

const EXTRA_PRICES = {
  kindersitz: 10,
  zusatzfahrer: 20,
  navi: 8,
  dachbox: 12,
  vollkasko: 25,
};

const EXTRA_LABELS = {
  kindersitz: "Kindersitz",
  zusatzfahrer: "Zusatzfahrer",
  navi: "Navigation",
  dachbox: "Dachbox",
  vollkasko: "Vollkasko",
};

const INSURANCE_OPTIONS = {
  basic: { name: "Basis-Versicherung", price: 0 },
  standard: { name: "Standard-Versicherung", price: 15 },
  premium: { name: "Premium-Versicherung", price: 35 },
};

function validate(form) {
  const errors = {};

  if (!form.firstName.trim()) errors.firstName = "Bitte Vorname eingeben.";
  if (!form.lastName.trim()) errors.lastName = "Bitte Nachname eingeben.";

  if (!form.email.trim()) errors.email = "Bitte E-Mail eingeben.";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "E-Mail ist nicht gültig.";

  if (!form.phone.trim()) errors.phone = "Bitte Telefonnummer eingeben.";
  else if (!/^\+?[0-9\s()-]{8,}$/.test(form.phone)) errors.phone = "Telefonnummer wirkt ungültig.";

  if (form.notes.length > 250) errors.notes = "Max. 250 Zeichen.";

  return errors;
}

function calcDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const s = new Date(startDate);
  const e = new Date(endDate);
  const diff = e - s;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

export default function BookingForm() {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCarFromState = location.state?.selectedCar;
  const selectedCarFromData = CARS.find((c) => String(c.id) === String(carId));
  const selectedCar = selectedCarFromState || selectedCarFromData;

  const selectedInsuranceFromState = location.state?.selectedInsurance || "standard";

  const [searchData, setSearchData] = useState({
    pickupLoc: "",
    returnLoc: "",
    startDate: "",
    endDate: "",
  });

  const [selectedInsurance, setSelectedInsurance] = useState(selectedInsuranceFromState);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+41 ",
    extras: {
      kindersitz: false,
      zusatzfahrer: false,
      navi: false,
      dachbox: false,
      vollkasko: false,
    },
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem("car4you_search")) || {};
    setSearchData({
      pickupLoc: savedSearch.pickupLoc || "",
      returnLoc: savedSearch.returnLoc || "",
      startDate: savedSearch.startDate || "",
      endDate: savedSearch.endDate || "",
    });

    const savedBooking = JSON.parse(localStorage.getItem("car4you_booking")) || null;
    if (savedBooking && String(savedBooking.carId) === String(carId)) {
      setForm(savedBooking.form);
    }
  }, [carId]);

  useEffect(() => {
    if (!selectedCar) navigate("/cars");
  }, [selectedCar, navigate]);

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const rentalDays = calcDays(searchData.startDate, searchData.endDate);

  const extrasSelected = Object.keys(form.extras).filter((key) => form.extras[key]);
  const extrasPerDay = extrasSelected.reduce((sum, key) => sum + (EXTRA_PRICES[key] || 0), 0);

  const carPerDay = selectedCar?.price || 0;
  const total = rentalDays > 0 ? rentalDays * (carPerDay + extrasPerDay) : 0;

  const isFormValid = Object.keys(errors).length === 0;

  const isReady =
    isFormValid &&
    searchData.pickupLoc &&
    searchData.startDate &&
    searchData.endDate &&
    rentalDays > 0;

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // HIER IST DIE FUNKTION, DIE GEFEHLT HAT:
  function toggleExtra(key) {
    setForm((prev) => ({
      ...prev,
      extras: { ...prev.extras, [key]: !prev.extras[key] },
    }));
  }

  function saveToLocalStorage() {
    localStorage.setItem(
      "car4you_booking",
      JSON.stringify({
        carId,
        form,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      notes: true,
    });

    if (!isReady) return;

    saveToLocalStorage();

    // Navigate to success page with booking data
    navigate("/success", {
      state: {
        car: selectedCar,
        searchData: searchData,
        form: form,
      },
    });
  }

  if (!selectedCar) return null;

  return (
    <div className="booking-page">
      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2 className="section-title">Personenangaben</h2>

          <div className="grid-2">
            <div className="field">
              <label>Vorname</label>
              <input
                value={form.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, firstName: true }))}
              />
              {touched.firstName && errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="field">
              <label>Nachname</label>
              <input
                value={form.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, lastName: true }))}
              />
              {touched.lastName && errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>

          <div className="field">
            <label>E-Mail</label>
            <input
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
            />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="field">
            <label>Telefon</label>
            <input
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
            />
            {touched.phone && errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <h2 className="section-title">Extras</h2>

          <div className="extras-list">
            {Object.keys(EXTRA_PRICES).map((key) => (
              <button
                key={key}
                type="button"
                className={`extra-card ${form.extras[key] ? "active" : ""}`}
                onClick={() => toggleExtra(key)}
              >
                <div className="extra-left">
                  <span className="extra-title">{EXTRA_LABELS[key]}</span>
                  <span className="extra-sub">+ CHF {EXTRA_PRICES[key]}/Tag</span>
                </div>
                <span className="extra-pill">{form.extras[key] ? "Ausgewählt" : "Wählbar"}</span>
              </button>
            ))}
          </div>

          <h2 className="section-title">Bemerkungen</h2>

          <div className="field">
            <textarea
              rows={5}
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, notes: true }))}
              placeholder="Max 250 Zeichen…"
            />
            <div className="hint-row">
              <span className={`hint ${form.notes.length > 250 ? "bad" : ""}`}>
                {form.notes.length}/250
              </span>
            </div>
            {touched.notes && errors.notes && <p className="error">{errors.notes}</p>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => {
                saveToLocalStorage();
                alert("💾 Entwurf gespeichert.");
              }}
            >
              Entwurf speichern
            </button>

            <button type="submit" className="primary" disabled={!isReady}>
              Kostenpflichtig mieten
            </button>
          </div>

          {!isReady && (
            <p className="footer-warning">
              Bitte Suchdaten (Ort + Datum) im ersten Screen wählen und alle Pflichtfelder ausfüllen.
            </p>
          )}
        </form>

        <SummaryBox
          total={total}
          car={selectedCar}
          searchData={searchData}
          extrasSelected={Object.keys(form.extras).filter((k) => form.extras[k])}
          rentalDays={rentalDays}
          carPerDay={carPerDay}
          extrasPerDay={extrasPerDay}
          selectedInsurance={selectedInsurance}
          insuranceData={INSURANCE_OPTIONS[selectedInsurance]}
        />
      </div>
    </div>
  );
}