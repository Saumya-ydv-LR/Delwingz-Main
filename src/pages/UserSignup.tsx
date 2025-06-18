import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);

    const payload = {
      name,
      email,
      mobile: phone,
      password,
      role: 'user',
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/Register`, payload);
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{ backgroundImage: "url('/user-signup-bg.jpg')" }}
      ></div>

      {/* Foreground Form */}
      <div className="relative z-10 bg-white bg-opacity-90 px-10 py-8 rounded-lg shadow-xl w-full max-w-md border border-red-200">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">User Sign Up</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-red-600 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-red-600 mb-1">Mobile Number</label>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-red-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        {/* Password */}
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

        {/* Submit Button */}
        <button
          onClick={handleSignup}
          disabled={loading || !name || !email || !phone || !password}
          className={`w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
