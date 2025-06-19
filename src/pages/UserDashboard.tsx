import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Address {
  id: number;
  text: string;
  isActive: boolean;
}

const UserDashboard: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie;
    const tokenMatch = cookies.match(/accessToken=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      console.log("Access Token (DEV):", token);
      fetch("/api/user/data", {
        method: "GET",
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => console.log("User data:", data))
        .catch(err => console.error("Error fetching user data:", err));
    } else {
      console.warn("No access token found in cookies.");
    }
  }, []);

  const handleAdd = () => {
    if (!newAddress.trim()) return;
    setAddresses(prev => [
      ...prev,
      { id: Date.now(), text: newAddress, isActive: prev.length === 0 },
    ]);
    setNewAddress('');
  };

  const handleDelete = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetActive = (id: number) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isActive: addr.id === id,
      }))
    );
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f9f3f2]">
      {/* Sidebar (without ☕ Dash) */}
      <aside className="w-full md:w-64 bg-[#e63946] text-white flex flex-col p-6 space-y-6 shadow-md">
        <nav className="flex flex-col gap-3 text-base font-semibold">
          <a href="#" className="hover:bg-[#d62828] p-3 rounded transition">🏠 Home</a>
          <a href="#" className="hover:bg-[#d62828] p-3 rounded transition">📦 Orders</a>
          <a href="#" className="hover:bg-[#d62828] p-3 rounded transition">📍 Addresses</a>
          <a href="#" className="hover:bg-[#d62828] p-3 rounded transition">⚙️ Settings</a>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 bg-white text-[#e63946] font-semibold px-4 py-2 rounded hover:bg-red-100 transition"
        >
          🔐 Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-[#a03333] mb-8">User Dashboard</h1>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#b94d4d] mb-6">📍 Manage Addresses</h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              placeholder="Enter a new address"
              className="flex-1 border border-red-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <button
              onClick={handleAdd}
              className="bg-[#e63946] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#d62828] transition"
            >
              ➕ Add
            </button>
          </div>

          <ul className="space-y-3">
            {addresses.map(address => (
              <li
                key={address.id}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border text-sm shadow-sm ${
                  address.isActive ? 'bg-[#ffe2e2] border-[#e47070]' : 'bg-white border-gray-300'
                }`}
              >
                <span className="mb-2 sm:mb-0 text-base">{address.text}</span>
                <div className="flex gap-2 flex-wrap">
                  {!address.isActive && (
                    <button
                      onClick={() => handleSetActive(address.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                    >
                      ✅ Set Active
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
