import './App.css';
import Dashboard from './components/dashboard_components/Dashboard';  
import SignIn from './components/dashboard_components/SignIn';
import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [center, setCenter] = useState(null); // Placeholder for center info

  // Callback for successful login
  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setCenter(username); // Replace with actual center info if available
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCenter(null);
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
