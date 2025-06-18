import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup-user`, {
        email,
        name,
        password,
      });
      alert('Signup successful! Check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="bg-white px-10 py-8 rounded-lg shadow-xl w-full max-w-md border border-red-200">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">User Sign Up</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-red-600 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-red-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-red-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold ${loading && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? <a href="/login" className="text-red-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
