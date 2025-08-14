// src/components/Dashboard.jsx
import React, { useState } from "react";
import "./Dashboard.css";
import BloodRequestForm from "./BloodRequestForm";
// TODO: Replace with actual backend endpoint for sign out
// const BACKEND_SIGNOUT_ENDPOINT = 'http://localhost:5000/api/signout'; // <-- Update this when backend is ready
import { QrReader } from 'react-qr-reader'; // Install with: npm install react-qr-reader

export default function Dashboard({ center, onSignOut }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [requests, setRequests] = useState([
    { id: 1, bloodType: "O+", units: 2, status: "Pending" },
    { id: 2, bloodType: "A-", units: 1, status: "Urgent" },
  ]);
  const [stock, setStock] = useState({
    "O+": 10,
    "A+": 8,
    "B+": 6,
    "AB+": 4,
    "O-": 3,
    "A-": 2,
  });

  // ----------------- Requests -----------------
  const approveRequest = (id) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  const markUrgent = (id) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "Urgent" } : req))
    );
    alert("Notification sent: Blood needed urgently!");
  };

  const addRequest = (newRequest) => setRequests(prev => [...prev, newRequest]);

  const editRequest = (id) => {
    const req = requests.find(r => r.id === id);
    const newUnits = prompt(`Edit units for ${req.bloodType}:`, req.units);
    if (!newUnits || isNaN(newUnits)) return;
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, units: parseInt(newUnits) } : r))
    );
  };

  const deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  // ----------------- Stock -----------------
  const updateStock = (type) => {
    const amount = prompt(`Enter number of units to add for ${type}:`);
    if (!amount || isNaN(amount)) return;
    setStock(prev => ({ ...prev, [type]: prev[type] + parseInt(amount) }));
  };

  // ----------------- Donations -----------------
  const [donationData, setDonationData] = useState({
    nic: "",
    bloodType: "O+",
    units: "",
  });
  const [scanQR, setScanQR] = useState(false);

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prev => ({ ...prev, [name]: value }));
  };

  const handleScan = (result) => {
    if (result) setDonationData(prev => ({ ...prev, nic: result }));
  };

  const submitDonation = () => {
    const { nic, bloodType, units } = donationData;
    if (!nic || !bloodType || !units || isNaN(units)) {
      alert("Please enter valid donation details!");
      return;
    }

    setStock(prev => ({ ...prev, [bloodType]: prev[bloodType] + parseInt(units) }));
    alert(`Donation recorded for ${nic}!`);
    setDonationData({ nic: "", bloodType: "O+", units: "" });
    setScanQR(false);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">Blood Bank Center</h2>
        <ul style={{ flex: 1 }}>
          <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</li>
          <li className={activeTab === "requests" ? "active" : ""} onClick={() => setActiveTab("requests")}>Requests</li>
          <li className={activeTab === "stock" ? "active" : ""} onClick={() => setActiveTab("stock")}>Stock</li>
          <li className={activeTab === "donations" ? "active" : ""} onClick={() => setActiveTab("donations")}>Record Donation</li>
        </ul>
        <button class="signout-btn" onClick={onSignOut} style={{ marginBottom: '10%', padding: '8px 16px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
          Sign Out
        </button>
      </aside>

      <main className="main-content">
        {/* Overview */}
        {activeTab === "overview" && (
          <section className="overview">
            <h1>Dashboard Overview</h1>
            <div className="stats">
              <div className="card red">
                <h3>Total Blood Units</h3>
                <p>{Object.values(stock).reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="card white">
                <h3>Pending Requests</h3>
                <p>{requests.filter(r => r.status === "Pending").length}</p>
              </div>
              <div className="card red">
                <h3>Urgent Requests</h3>
                <p>{requests.filter(r => r.status === "Urgent").length}</p>
              </div>
            </div>
          </section>
        )}

        {/* Requests */}
        {activeTab === "requests" && (
          <section className="requests">
            <BloodRequestForm onAddRequest={addRequest} />
            <h1>Manage Requests</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Blood Type</th>
                  <th>Units</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.bloodType}</td>
                    <td>{req.units}</td>
                    <td>{req.status}</td>
                    <td>
                      <button onClick={() => approveRequest(req.id)}>Approve</button>
                      <button onClick={() => markUrgent(req.id)}>Mark Urgent</button>
                      <button onClick={() => editRequest(req.id)}>Edit</button>
                      <button onClick={() => deleteRequest(req.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Stock */}
        {activeTab === "stock" && (
          <section className="stock">
            <h1>Blood Stock</h1>
            <div className="stock-container">
              {Object.entries(stock).map(([type, units]) => {
                const percentage = Math.min((units / 100) * 100, 100);
                return (
                  <div key={type} className="stock-item">
                    <div className="stock-label">{type}</div>
                    <div className="stock-bar">
                      <div className="stock-fill" style={{ height: `${percentage}%` }}></div>
                    </div>
                    <div className="stock-text">{units} units</div>
                    <button onClick={() => updateStock(type)}>Update</button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Record Donation */}
        {activeTab === "donations" && (
          <section className="donations">
            <h1>Record Blood Donation</h1>
            <div className="donation-form">
              <label>Donor QR/NIC:</label>
              <input
                type="text"
                name="nic"
                value={donationData.nic}
                onChange={handleDonationChange}
                placeholder="Scan QR or enter NIC"
              />
              <button type="button" onClick={() => setScanQR(!scanQR)}>
                {scanQR ? "Close QR Scanner" : "Scan QR Code"}
              </button>
              {scanQR && (
                <div className="qr-scanner">
                  <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={(result, error) => {
                      if (!!result) handleScan(result?.text);
                    }}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
              <label>Blood Type:</label>
              <select name="bloodType" value={donationData.bloodType} onChange={handleDonationChange}>
                {Object.keys(stock).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <label>Units Donated:</label>
              <input type="number"  min="1" name="units" value={donationData.units} onChange={handleDonationChange} />
              <button onClick={submitDonation}>Submit Donation</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
