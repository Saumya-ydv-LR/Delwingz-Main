import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup: React.FC = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-otp`, {
        phone,
      });
      setOtpSent(true);
      alert('OTP sent to your phone.');
    } catch (error) {
      alert('Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (method === 'email') {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup-user`, {
          email,
          password,
        });
        alert('Signup successful! Check your email.');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup-user-phone`, {
          phone,
          otp,
        });
        alert('Signup successful with phone!');
      }
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

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMethod('email')}
            className={`px-4 py-2 rounded-full border ${method === 'email' ? 'bg-red-600 text-white' : 'border-red-300 text-red-600'}`}
          >
            Sign up with Email
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`px-4 py-2 rounded-full border ${method === 'phone' ? 'bg-red-600 text-white' : 'border-red-300 text-red-600'}`}
          >
            Sign up with Phone
          </button>
        </div>

        {method === 'email' && (
          <>
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
          </>
        )}

        {method === 'phone' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-red-600 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading || !phone}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold mb-4"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-medium text-red-600 mb-1">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                />
              </div>
            )}
          </>
        )}

        <button
          onClick={handleSignup}
          disabled={loading || (method === 'email' && (!email || !password)) || (method === 'phone' && (!otpSent || !otp))}
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
