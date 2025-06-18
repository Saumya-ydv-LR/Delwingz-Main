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

      // Handle login success
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

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-delwingz-off-white px-8">
        <h1 className="text-3xl font-bold mb-4 font-display delwingz-black">
          Get Delicious Platter in Your Home
        </h1>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Login to enjoy delicious meals delivered right into you
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded text-white bg-delwingz-red hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Create Account Button */}
        <button
          onClick={handleCreateAccount}
          className="mt-4 text-sm font-medium text-delwingz-red hover:underline"
        >
          Create Account
        </button>

        {/* Admin Signup Link */}
        <p
          onClick={handleAdminSignup}
          className="mt-2 text-sm font-medium text-delwingz-red hover:underline cursor-pointer"
        >
          Admin Signup
        </p>
      </div>

      {/* Right Section with Image */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img
          src="/delwingz-login-banner.png"
          alt="Delwingz Banner"
          className="max-w-[100%] max-h-[100%] object-contain"
        />
      </div>
    </div>
  );
}
