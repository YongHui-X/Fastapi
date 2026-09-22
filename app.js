import { useState } from "react";

function App() {
  const [cargoType, setCargoType] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [ships, setShips] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [requireDate, setRequireDate] = useState("");

  const searchShips = async () => {
    const response = await fetch("http://localhost:8000/api/ship/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cargo_type: cargoType,
        cargo_weight: Number(cargoWeight),
        origin,
        destination,
        require_date: requireDate,
      }),
    });

    const data = await response.json();
    setShips(data.matches || []);
  };

  return (
    <div>
      <h1>Ship Finder</h1>

      <input
        placeholder="Cargo type"
        value={cargoType}
        onChange={(e) => setCargoType(e.target.value)}
      />

      <input
        type="number"
        placeholder="Cargo weight"
        value={cargoWeight}
        onChange={(e) => setCargoWeight(e.target.value)}
      />

      <input
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />

      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        type="date"
        value={requireDate}
        onChange={(e) => setRequireDate(e.target.value)}
      />

      <button onClick={searchShips}>Search Ships</button>

      {ships.map((ship) => (
        <div key={ship.id}>
          <h2>{ship.name}</h2>
          <p>Capacity: {ship.capacity}</p>
          <p>Available: {ship.available_date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;