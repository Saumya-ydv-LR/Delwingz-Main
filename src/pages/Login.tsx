import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      const cookieToken = document.cookie.match(/accessToken=([^;]+)/);
      if (cookieToken) {
        console.log("Access Token (DEV):", cookieToken[1]);
      } else {
        console.warn("No access token found in cookies.");
      }

      const userRole = res.data?.user?.role;
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

  // SVG graffiti pattern as background (black icons, low opacity)
  const graffitiPattern = (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.18,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="graffiti"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Burger */}
          <g>
            <rect x="10" y="60" rx="8" ry="8" width="38" height="15" fill="none" stroke="#000" strokeWidth="2"/>
            <ellipse cx="29" cy="61" rx="19" ry="7" fill="none" stroke="#000" strokeWidth="2"/>
            <ellipse cx="29" cy="54" rx="19" ry="7" fill="none" stroke="#000" strokeWidth="2"/>
          </g>
          {/* Sausage */}
          <g>
            <ellipse cx="80" cy="32" rx="15" ry="6" fill="none" stroke="#000" strokeWidth="2"/>
            <ellipse cx="66" cy="31" rx="2" ry="1.5" fill="#000"/>
            <ellipse cx="94" cy="33" rx="2" ry="1.5" fill="#000"/>
          </g>
          {/* Steak */}
          <g>
            <path d="M60 80 Q90 90 80 60 Q70 50 55 65 Q50 85 60 80" fill="none" stroke="#000" strokeWidth="2"/>
            <ellipse cx="70" cy="73" rx="5" ry="2" fill="none" stroke="#000" strokeWidth="1.5"/>
          </g>
          {/* Drumstick */}
          <g>
            <ellipse cx="30" cy="20" rx="10" ry="6" fill="none" stroke="#000" strokeWidth="2"/>
            <rect x="35" y="15" width="18" height="7" rx="3.5" fill="none" stroke="#000" strokeWidth="2" transform="rotate(25 44 18.5)" />
          </g>
          {/* Onion */}
          <g>
            <ellipse cx="80" cy="80" rx="8" ry="8" fill="none" stroke="#000" strokeWidth="2"/>
            <path d="M80 72 Q77 80 80 88 Q83 80 80 72" fill="none" stroke="#000" strokeWidth="2"/>
          </g>
          {/* Mushroom */}
          <g>
            <ellipse cx="15" cy="85" rx="8" ry="5" fill="none" stroke="#000" strokeWidth="2"/>
            <rect x="11" y="85" width="8" height="6" rx="3" fill="none" stroke="#000" strokeWidth="1.5"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#graffiti)" />
    </svg>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen min-w-screen h-screen w-screen bg-[#a6001a] overflow-hidden p-0 m-0 relative">
      {/* Graffiti Pattern, covers all page, under everything */}
      {graffitiPattern}

      {/* Left Side (Branding Image) */}
      <div className="flex items-center justify-center w-full lg:w-1/2 h-1/3 lg:h-full bg-transparent relative z-10">
        <img
          src="/login-delwing.png"
          alt="Logo"
          className="w-40 h-40 lg:w-60 lg:h-60 z-20"
        />
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-0 py-0 h-full z-10">
        <div
          className="bg-white/90 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-[#a6001a] relative"
          style={{
            boxShadow:
              "0 4px 24px 0 rgba(166,0,26,0.08), 0 1.5px 6px 0 rgba(166,0,26,0.12)",
            backdropFilter: "blur(6px)",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-[#a6001a] font-serif mb-1 drop-shadow">
            User Login
          </h2>
          <h3 className="text-lg lg:text-xl text-center font-bold mt-1 text-[#6e0000]">Welcome Back</h3>
          <p className="text-sm text-center text-[#A6001A] mb-6">
            Login to access the user dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identifier Input */}
            <div>
              <label className="text-sm block mb-1 text-[#a6001a] font-medium">Email or Mobile</label>
              <div className="flex items-center border-2 border-[#a6001a] rounded-lg px-3 py-2 bg-white/70 focus-within:ring-2 focus-within:ring-[#a6001a] transition shadow-inner">
                <span className="mr-2 text-[#a6001a]">👤</span>
                <input
                  type="text"
                  placeholder="Enter Email or Mobile No."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full outline-none bg-transparent text-[#1a1a1a]"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm block mb-1 text-[#a6001a] font-medium">Password</label>
              <div className="flex items-center border-2 border-[#a6001a] rounded-lg px-3 py-2 bg-white/70 focus-within:ring-2 focus-within:ring-[#a6001a] transition shadow-inner">
                <span className="mr-2 text-[#a6001a]">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none bg-transparent text-[#1a1a1a]"
                  required
                />
                <button
                  type="button"
                  className="ml-2 text-[#a6001a] hover:text-[#6e0000] transition"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a6001a] text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-[#820017] transition active:scale-95"
              style={{ letterSpacing: '0.04em' }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            {/* Footer Links */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-[#a6001a] mt-2">
              <button type="button" onClick={handleCreateAccount} className="hover:underline font-semibold">
                Create Account
              </button>
              <span className="hidden sm:block">|</span>
              <button type="button" onClick={handleForgotPassword} className="hover:underline font-semibold">
                Forgot Password?
              </button>
            </div>

            <p
              onClick={handleAdminSignup}
              className="text-center text-sm mt-4 cursor-pointer text-[#a6001a] hover:underline font-semibold"
            >
              Admin Signup
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}