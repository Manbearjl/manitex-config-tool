import React, { useState } from "react";

const data = [
  {
    chartType: "Main Boom",
    zone: "360°",
    radius: 35,
    boomLength: 85,
    boomAngle: 75,
    capacity: 15000,
  },
  {
    chartType: "Main Boom",
    zone: "360°",
    radius: 45,
    boomLength: 105,
    boomAngle: 68,
    capacity: 12000,
  },
  {
    chartType: "Fixed Jib",
    zone: "Over Rear",
    radius: 70,
    boomLength: 135,
    boomAngle: 60,
    capacity: 5000,
  },
];

function App() {
  const [grossLoad, setGrossLoad] = useState(0);
  const [chartType, setChartType] = useState("Main Boom");
  const [zone, setZone] = useState("360°");
  const [criticalLift, setCriticalLift] = useState(75);

  const matchingConfigs = data.filter((entry) => {
    return (
      entry.chartType === chartType &&
      entry.zone === zone &&
      entry.capacity >= grossLoad
    );
  });

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Manitex 50155S Config Tool</h1>

      <label>Gross Load (lbs): </label>
      <input
        type="number"
        value={grossLoad}
        onChange={(e) => setGrossLoad(parseFloat(e.target.value))}
      />

      <br /><br />

      <label>Chart Type: </label>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option>Main Boom</option>
        <option>Fixed Jib</option>
        <option>Personnel Platform</option>
      </select>

      <br /><br />

      <label>Zone: </label>
      <select value={zone} onChange={(e) => setZone(e.target.value)}>
        <option>360°</option>
        <option>Over Rear</option>
      </select>

      <br /><br />

      <label>Critical Lift % Threshold: </label>
      <input
        type="number"
        value={criticalLift}
        onChange={(e) => setCriticalLift(parseFloat(e.target.value))}
      />

      <br /><br />

      <h2>Matching Configurations:</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Radius (ft)</th>
            <th>Boom Length (ft)</th>
            <th>Boom Angle (°)</th>
            <th>Capacity (lbs)</th>
            <th>Critical Lift %</th>
          </tr>
        </thead>
        <tbody>
          {matchingConfigs.map((entry, index) => {
            const percent = ((grossLoad / entry.capacity) * 100).toFixed(1);
            const percentStyle = {
              color: percent > criticalLift ? "red" : "green",
              fontWeight: percent > criticalLift ? "bold" : "normal",
            };
            return (
              <tr key={index}>
                <td>{entry.radius}</td>
                <td>{entry.boomLength}</td>
                <td>{entry.boomAngle}</td>
                <td>{entry.capacity}</td>
                <td style={percentStyle}>{percent}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {matchingConfigs.length === 0 && <p>No configurations match the criteria.</p>}
    </div>
  );
}

export default App;
