import React, { useState } from 'react';
import { Zap } from 'lucide-react';

const LogIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (isSignup) {
        // Handle signup
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name: email.split('@')[0],
          }),
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        }

        alert('Signup successful! Please log in.');
        setIsSignup(false);
        setEmail('');
        setPassword('');
      } else {
        // Handle login
        if (typeof onLogin !== 'function') {
          console.error('onLogin prop is not provided');
          return;
        }
        onLogin({ email, password });
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred');
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
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg font-bold hover:from-emerald-600 hover:to-teal-600 transition shadow-lg"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <div className="text-center">
            <button
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