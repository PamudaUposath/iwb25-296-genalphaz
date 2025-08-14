import React, { useState } from 'react';
import './SignIn.css';

// TODO: Replace with actual backend endpoint for authentication
// const BACKEND_SIGNIN_ENDPOINT = 'http://localhost:5000/api/signin'; // <-- Update this when backend is ready

function SignIn({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // TODO: Implement actual API call to backend
    /*
    fetch(BACKEND_SIGNIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        // handle success or error
      })
      .catch(err => setError('Sign in failed'))
      .finally(() => setLoading(false));
    */
    setTimeout(() => {
      setLoading(false);
      if (username === 'admin' && password === 'admin') {
        // Simulate successful login
        if (onLogin) onLogin(username);
      } else {
        setError('Invalid username or password');
      }
    }, 1000);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
