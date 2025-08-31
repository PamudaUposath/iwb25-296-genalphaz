import './App.css';
import Dashboard from './components/dashboard_components/Dashboard';  
import SignIn from './components/dashboard_components/SignIn';
import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [center, setCenter] = useState(null);

  // 🔹 Restore login state on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("center");
    if (storedUser) {
      setIsAuthenticated(true);
      setCenter(storedUser);
    }
  }, []);

  // 🔹 Handle successful login
  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setCenter(username);
    localStorage.setItem("center", username); // save session
  };

  // 🔹 Handle sign out
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCenter(null);
    localStorage.removeItem("center"); // clear session
  };

  return (
    <div>
      {!isAuthenticated ? (
        <SignIn onLogin={handleLogin} />
      ) : (
        <Dashboard center={center} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
