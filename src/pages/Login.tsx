import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: { email?: string; mobile?: string; password: string } = { password };
    isEmail(identifier) ? (payload.email = identifier) : (payload.mobile = identifier);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/Login`,
        payload,
        { withCredentials: true }
      );

      // ✅ Log access token from cookie
      const cookieToken = document.cookie.match(/accessToken=([^;]+)/);
      if (cookieToken) {
        console.log("Access Token (DEV):", cookieToken[1]);
      } else {
        console.warn("No access token found in cookies.");
      }

      // ✅ Role-based redirection
      const userRole = res.data?.user?.role;
      console.log("User Role:", userRole);

      alert('Login successful!');
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => navigate('/signup-user');
  const handleAdminSignup = () => navigate('/signup-admin');

  const handleForgotPassword = async () => {
    if (!identifier) return alert('Please enter your email or mobile number first.');

    const payload: { email?: string; mobile?: string } = {};
    isEmail(identifier) ? (payload.email = identifier) : (payload.mobile = identifier);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password`, payload);
      alert("Password reset instructions have been sent!");
    } catch (error) {
      console.error(error);
      alert("Failed to send reset instructions. Try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-[#a6001a] overflow-hidden">
      {/* Left Side (Branding Image) */}
      <div className="flex items-center justify-center w-full lg:w-1/2 h-1/3 lg:h-full bg-[#a6001a]">
        <img src="/login-delwing.png" alt="Logo" className="w-40 h-40 lg:w-60 lg:h-60" />
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-6 py-10 lg:py-0">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-[#e63946] font-serif">
            User Login
          </h2>
          <h3 className="text-lg lg:text-xl text-center font-bold mt-2">Welcome Back</h3>
          <p className="text-sm text-center text-gray-500 mb-6">
            Login to access the user dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identifier Input */}
            <div>
              <label className="text-sm block mb-1">Email or Mobile</label>
              <div className="flex items-center border rounded px-3 py-2">
                <span className="mr-2">👤</span>
                <input
                  type="text"
                  placeholder="Enter Email or Mobile No."
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
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-[#a6001a] mt-2">
              <button type="button" onClick={handleCreateAccount} className="hover:underline">
                Create Account
              </button>
              <span className="hidden sm:block">|</span>
              <button type="button" onClick={handleForgotPassword} className="hover:underline">
                Forgot Password?
              </button>
            </div>

            <p
              onClick={handleAdminSignup}
              className="text-center text-sm mt-4 cursor-pointer text-[#a6001a] hover:underline"
            >
              Admin Signup
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
