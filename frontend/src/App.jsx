import { useState } from "react";

function App() {
  const [cargoType, setCargoType] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [requireDate, setRequireDate] = useState("");
  const [ships, setShips] = useState([]);

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

    console.log("RESPONSE:", response);
    const data = await response.json();
    console.log("DATA:", data);
    setShips(data.matches || []);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Ship Finder</h1>

      <div style={{ display: "grid", gap: "12px" }}>
        <input
          placeholder="Cargo type"
          value={cargoType}
          onChange={(e) => setCargoType(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Cargo weight"
          value={cargoWeight}
          onChange={(e) => setCargoWeight(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={inputStyle}
        />

        <input
          type="date"
          value={requireDate}
          onChange={(e) => setRequireDate(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={searchShips}
          style={{
            padding: "10px 16px",
            background: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search Ships
        </button>
      </div>

      <div style={{ marginTop: "24px" }}>
        {ships.map((ship) => (
          <div
            key={ship.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "12px",
            }}
          >
            <h2 style={{ margin: "0 0 8px" }}>{ship.name}</h2>
            <p style={{ margin: "4px 0" }}>Capacity: {ship.capacity}</p>
            <p style={{ margin: "4px 0" }}>Available: {ship.available_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "16px",
};

export default App;
