export const CARS = [
  // Kategorie: CITY (CHF 45.-) 
  {
    id: 1,
    model: "Fiat 500",
    brand: "Fiat",
    category: "City",
    price: 45,
    gear: "Manuell", // Für den Filter "Schaltung"
    seats: 4,
    fuel: "Benzin",
    image: "/assets/fiat500.jpg" // Stellt sicher, dass ihr Bilder mit diesen Namen im assets-Ordner habt
  },
  {
    id: 2,
    model: "VW Polo",
    brand: "VW",
    category: "City",
    price: 45,
    gear: "Automatik",
    seats: 5,
    fuel: "Benzin",
    image: "/assets/vw-polo.jpg"
  },

  // Kategorie: FAMILY (CHF 70.-) 
  {
    id: 3,
    model: "VW Touran",
    brand: "VW",
    category: "Family",
    price: 70,
    gear: "Automatik",
    seats: 7,
    fuel: "Diesel",
    image: "/assets/vw-touran.jpg"
  },
  {
    id: 4,
    model: "Skoda Octavia",
    brand: "Skoda",
    category: "Family",
    price: 70,
    gear: "Manuell",
    seats: 5,
    fuel: "Benzin",
    image: "/assets/skoda-octavia.jpg"
  },

  // Kategorie: SUV (CHF 90.-) 
  {
    id: 5,
    model: "VW Tiguan",
    brand: "VW",
    category: "SUV",
    price: 90,
    gear: "Automatik",
    seats: 5,
    fuel: "Diesel",
    image: "/assets/vw-tiguan.jpg"
  },
  {
    id: 6,
    model: "Volvo XC60",
    brand: "Volvo",
    category: "SUV",
    price: 90,
    gear: "Automatik",
    seats: 5,
    fuel: "Hybrid",
    image: "/assets/volvo-xc60.jpg"
  },

  // Kategorie: SPORT (CHF 120.-) 
  {
    id: 7,
    model: "BMW Z4",
    brand: "BMW",
    category: "Sport",
    price: 120,
    gear: "Automatik",
    seats: 2,
    fuel: "Benzin",
    image: "/assets/bmw-z4.jpg"
  },
  {
    id: 8,
    model: "Audi TT",
    brand: "Audi",
    category: "Sport",
    price: 120,
    gear: "Manuell",
    seats: 2, // Achtung: Sportwagen haben oft weniger Sitze (Filter-Logik!)
    fuel: "Benzin",
    image: "/assets/audi-tt.jpg"
  },

  // Kategorie: E-CAR (CHF 100.-) 
  {
    id: 9,
    model: "Tesla Model 3",
    brand: "Tesla",
    category: "E-Car",
    price: 100,
    gear: "Automatik", // E-Autos sind fast immer Automatik
    seats: 5,
    fuel: "Elektro",
    image: "/assets/tesla-model3.jpg"
  },
  {
    id: 10,
    model: "Renault Zoe",
    brand: "Renault",
    category: "E-Car",
    price: 100,
    gear: "Automatik",
    seats: 5,
    fuel: "Elektro",
    image: "/assets/renault-zoe.jpg"
  }
];