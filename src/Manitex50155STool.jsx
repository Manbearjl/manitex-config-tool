
import { useState } from "react";
import logo from "./logo.png";

const boomConfigs = [
  { name: "Main Boom", lengths: [34, 47, 61, 74, 88, 101, 115, 128, 142, 155] },
  { name: "31 ft Fixed Jib", lengths: [31] },
  { name: "55 ft Fixed Jib", lengths: [55] },
  { name: "Personnel Lifting", lengths: ["Main Boom", "Extended Jib"] },
];

const Manitex50155STool = () => {
  const [grossLoad, setGrossLoad] = useState(0);
  const [selectedBoom, setSelectedBoom] = useState("Main Boom");
  const [partsOfLine, setPartsOfLine] = useState(1);
  const [areaOfOperation, setAreaOfOperation] = useState("360°");

  const loadChart = [
    { radius: 10, boom: 34, angle: 69.64, capacity: 68100 },
    { radius: 20, boom: 74, angle: 73.71, capacity: 31400 },
    { radius: 30, boom: 101, angle: 73.06, capacity: 14200 },
    { radius: 40, boom: 115, angle: 67.08, capacity: 12100 },
    { radius: 50, boom: 128, angle: 65.7, capacity: 9000 },
    { radius: 60, boom: 142, angle: 64.3, capacity: 7050 },
    { radius: 65, boom: 155, angle: 67, capacity: 6200 },
    { radius: 75, boom: 155, angle: 60.9, capacity: 4500 },
    { radius: 85, boom: 155, angle: 55.6, capacity: 3200 },
    { radius: 100, boom: 155, angle: 47.1, capacity: 1700 },
    { radius: 65, boom: 31, angle: 30, capacity: 4000 },
    { radius: 75, boom: 55, angle: 25, capacity: 3000 },
    { radius: 50, boom: "Main Boom", angle: 70, capacity: 2000 },
    { radius: 55, boom: "Extended Jib", angle: 65, capacity: 1500 },
  ];

  const validConfigs = loadChart.filter(
    (c) =>
      c.boom.toString().includes(
        selectedBoom.includes("Jib")
          ? "Jib"
          : selectedBoom.includes("Personnel")
          ? selectedBoom.includes("Main")
            ? "Main Boom"
            : "Extended Jib"
          : selectedBoom
      ) && grossLoad <= c.capacity * partsOfLine
  );

  return (
    <div className="p-4 max-w-3xl mx-auto text-sm md:text-base">
      <div className="flex items-center gap-4 mb-4">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <h1 className="text-xl md:text-2xl font-bold">Manitex 50155S Configuration Tool</h1>
      </div>

      <p className="text-xs text-red-600 mb-6">
        This is an approximation tool for planning only. Always consult official Manitex load charts and LMI systems before lifting.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Gross Load (lbs)</label>
          <input
            type="number"
            value={grossLoad}
            onChange={(e) => setGrossLoad(Number(e.target.value))}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Boom Configuration</label>
          <select
            className="border px-2 py-1 w-full"
            value={selectedBoom}
            onChange={(e) => setSelectedBoom(e.target.value)}
          >
            {boomConfigs.map((config) => (
              <option key={config.name}>{config.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Parts of Line</label>
          <input
            type="number"
            min="1"
            value={partsOfLine}
            onChange={(e) => setPartsOfLine(Number(e.target.value))}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Area of Operation</label>
          <select
            className="border px-2 py-1 w-full"
            value={areaOfOperation}
            onChange={(e) => setAreaOfOperation(e.target.value)}
          >
            <option value="360°">360°</option>
            <option value="Over Front">Over Front</option>
            <option value="Over Rear">Over Rear</option>
            <option value="Over Side">Over Side</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse text-xs md:text-sm">
        <thead>
          <tr>
            <th className="border p-2">Radius (ft)</th>
            <th className="border p-2">Boom Length</th>
            <th className="border p-2">Boom Angle (°)</th>
            <th className="border p-2">Capacity (lbs)</th>
            <th className="border p-2">Net Margin (lbs)</th>
          </tr>
        </thead>
        <tbody>
          {validConfigs.map((c, i) => (
            <tr key={i} className="bg-green-50">
              <td className="border p-2">{c.radius}</td>
              <td className="border p-2">{c.boom}</td>
              <td className="border p-2">{c.angle}</td>
              <td className="border p-2">{c.capacity.toLocaleString()}</td>
              <td className="border p-2">{(c.capacity * partsOfLine - grossLoad).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manitex50155STool;
