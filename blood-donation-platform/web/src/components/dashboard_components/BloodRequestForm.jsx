// src/components/BloodRequestForm.jsx
import React, { useState } from "react";
import "./BloodRequestForm.css";

export default function BloodRequestForm({ onAddRequest }) {
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bloodType || !units) return;

    const newRequest = {
      id: Date.now(),
      bloodType,
      units: parseInt(units),
      status: "Routine",
    };

    onAddRequest(newRequest);
    setBloodType("");
    setUnits("");
  };

  return (
    <form className="blood-request-form" onSubmit={handleSubmit}>
      <h2>Create Blood Request</h2>

      <label>Blood Type</label>
      <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
        <option value="">Select</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>

      <label>Units</label>
      <input
        type="number"
        min="1"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
      />

      <button type="submit">Add Request</button>
    </form>
  );
}
