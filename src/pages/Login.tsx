import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic here
    console.log("Logging in...");
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
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full py-3 rounded text-white bg-delwingz-red hover:bg-primary/90 transition"
          >
            Login
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

      {/* Right Section with Shrunk Image */}
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
