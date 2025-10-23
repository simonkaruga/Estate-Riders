import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { apiGet, apiPost } from '../api'; // Import your API helpers

const LogIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      if (isSignup) {
        // 🔹 Check if user exists
        const users = await apiGet(`users?email=${encodeURIComponent(email)}`);
        if (users.length > 0) {
          alert('⚠️ User with this email already exists.');
          setLoading(false);
          return;
        }

        // 🔹 Create new user
        const newUser = {
          email,
          password,
          name: email.split('@')[0],
          totalBookings: 0,
          totalSpent: 0,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          role: 'user',
        };

        await apiPost('users', newUser);
        alert('✅ Signup successful! Please log in.');
        setIsSignup(false);
        setEmail('');
        setPassword('');
      } else {
        // 🔹 Handle login
        const users = await apiGet(`users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

        if (users.length === 0) {
          alert('❌ Invalid email or password.');
          setLoading(false);
          return;
        }

        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        alert(`✅ Welcome back, ${user.name}!`);

        if (typeof onLogin === 'function') onLogin(user);
      }
    } catch (error) {
      console.error('Login/Signup error:', error);
      alert('⚠️ Failed to connect to the server. Please ensure JSON Server or API is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl inline-block mb-4">
            <Zap className="text-white" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Estate Riders</h1>
          <p className="text-gray-600 mt-2">Electric Mobility Rentals</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg font-bold hover:from-emerald-600 hover:to-teal-600 transition shadow-lg disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
