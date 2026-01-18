import React from "react";
import "./SummaryBox.css";

function formatCHF(value) {
  return value.toLocaleString("de-CH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const EXTRA_LABELS = {
  kindersitz: "Kindersitz",
  zusatzfahrer: "Zusatzfahrer",
  navi: "Navigation",
  dachbox: "Dachbox",
  vollkasko: "Vollkasko",
};

export default function SummaryBox({
  total,
  car,
  searchData,
  extrasSelected,
  rentalDays,
  carPerDay,
  extrasPerDay,
  selectedInsurance,
  insuranceData,
}) {
  const prettyExtras =
    extrasSelected.length > 0
      ? extrasSelected.map((k) => EXTRA_LABELS[k] || k).join(", ")
      : "Keine";

  return (
    <aside className="summary">
      <h3 className="summary-title">Zusammenfassung</h3>

      <div className="summary-price">
        <div className="summary-total">{formatCHF(total)} CHF</div>
        <div className="summary-sub">
          {rentalDays > 0
            ? `${rentalDays} Tag(e) · CHF ${carPerDay + extrasPerDay + (insuranceData?.price || 0)}/Tag`
            : "Bitte Datum auswählen"}
        </div>
      </div>

      <div className="summary-row">
        <span className="label">Fahrzeug</span>
        <span className="value">{car?.brand} {car?.model}</span>
      </div>

      <div className="summary-row">
        <span className="label">Versicherung</span>
        <span className="value">{insuranceData?.name || "—"}</span>
      </div>

      <div className="summary-row">
        <span className="label">Abholung</span>
        <span className="value">{searchData.pickupLoc || "—"} ({searchData.startDate || "—"})</span>
      </div>

      <div className="summary-row">
        <span className="label">Rückgabe</span>
        <span className="value">{searchData.returnLoc || "—"} ({searchData.endDate || "—"})</span>
      </div>

      <div className="summary-row">
        <span className="label">Extras</span>
        <span className="value">{prettyExtras}</span>
      </div>
    </aside>
  );
}
