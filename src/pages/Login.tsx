import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: {
      email?: string;
      mobile?: string;
      password: string;
    } = {
      password,
    };

    if (isEmail(identifier)) {
      payload.email = identifier;
    } else {
      payload.mobile = identifier;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/Login`,
        payload
      );

      alert('Login successful!');
      // Example: navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/signup-user");
  };

  const handleAdminSignup = () => {
    navigate("/signup-admin");
  };

  const handleForgotPassword = async () => {
    if (!identifier) {
      alert('Please enter your email or mobile number first.');
      return;
    }

    const payload: { email?: string; mobile?: string } = {};

    if (isEmail(identifier)) {
      payload.email = identifier;
    } else {
      payload.mobile = identifier;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password`, payload);
      alert("Password reset instructions have been sent!");
    } catch (error) {
      console.error(error);
      alert("Failed to send reset instructions. Try again.");
    }
  };

  return (
    <div className="relative flex h-screen w-screen bg-[#a6001a] overflow-hidden">
      {/* Background Image or Branding on Left */}
      <div className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center z-0">
        <img src="/login-delwing.png" alt="Logo" className="w-60 h-60" />
      </div>

      {/* Login Form aligned to right and centered vertically */}
      <div className="flex items-center justify-end h-screen w-full pr-24">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-[400px]">
          <h2 className="text-5xl font-extrabold text-center text-[#e63946] font-serif">
            User Login
          </h2>
          <h3 className="text-xl text-center font-bold mt-2">Welcome Back</h3>
          <p className="text-sm text-center text-gray-500 mb-6">
            Login to access the user dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="text-sm block mb-1">Email or Mobile</label>
              <div className="flex items-center border rounded px-3 py-2">
                <span className="mr-2">📧</span>
                <input
                  type="text"
                  placeholder="admin@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm block mb-1">Password</label>
              <div className="flex items-center border rounded px-3 py-2">
                <span className="mr-2">🔒</span>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e63946] text-white py-3 rounded hover:bg-[#d62828] transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Footer Links */}
            <div className="flex justify-center gap-4 text-sm text-[#a6001a]">
              <button
                type="button"
                onClick={handleCreateAccount}
                className="hover:underline"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <p
              onClick={handleAdminSignup}
              className="text-center text-sm mt-2 cursor-pointer text-[#a6001a] hover:underline"
            >
              Admin Signup
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
