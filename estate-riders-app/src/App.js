import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import About from './pages/About';
import LogIn from './pages/LogIn';
import HireForm from './components/HireForm';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleUserLogin = async (userData) => {
    try {
      // Check if user exists
      const response = await fetch(
        `http://localhost:3001/users?email=${encodeURIComponent(userData.email)}`
      );
      const users = await response.json();

      if (users.length === 0) {
        throw new Error('User not found');
      }

      const user = users[0];
      if (user.password !== userData.password) {
        throw new Error('Invalid password or email');
      }

      // Remove password from user object before storing in state
      const { password, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      navigate('/about');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      {/* Header with user info and logout */}
      {user && (
        <header className="bg-emerald-500 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span>Welcome, {user.name}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 transition"
            >
              Logout
            </button>
          </div>
        </header>
      )}

      <main className={user ? 'pt-4' : ''}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/about" /> : <LogIn onLogin={handleUserLogin} />}
          />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/about" /> : <LogIn onLogin={handleUserLogin} />}
          />
          <Route
            path="/hire"
            element={user ? <HireForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
