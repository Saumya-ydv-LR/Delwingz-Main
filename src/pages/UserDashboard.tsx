import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Address {
  id: number;
  address_name: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isActive: boolean;
}

interface UserDetails {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  last_login_date: string;
}

const UserDashboard: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isActive'>>({
    address_name: '',
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie;
    const tokenMatch = cookies.match(/accessToken=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      fetch("/api/users/me", {
        method: "GET",
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => setUserDetails(data.data))
        .catch(err => console.error("Error fetching user details:", err));
    } else {
      console.warn("No access token found in cookies.");
    }
  }, [navigate]);

  const handleAdd = async () => {
    const isEmpty = Object.values(newAddress).some(value => !value.trim());
    if (isEmpty) return;

    try {
      await fetch("/api/user/addresses", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newAddress),
      });

      setAddresses(prev => [
        ...prev,
        {
          ...newAddress,
          id: Date.now(),
          isActive: prev.length === 0,
        },
      ]);

      setNewAddress({
        address_name: '',
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
      });
    } catch (err) {
      console.error("Failed to add address:", err);
    }
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fff0f0] text-black font-['Poppins']">
      <aside className="w-full md:w-64 bg-gradient-to-b from-[#ff4d4d] to-[#e60039] text-white flex flex-col p-6 space-y-6 shadow-2xl rounded-r-3xl">
        <div className="text-4xl font-extrabold tracking-wide text-center drop-shadow-lg animate-bounce">🐔</div>
        <nav className="flex flex-col gap-3 text-lg font-semibold">
          {["📦 Orders", "📍 Addresses", "⚙️ Settings"].map((label) => (
            <a
              key={label}
              href="#"
              className="p-3 rounded-xl bg-white text-black hover:bg-white hover:text-[#e60039] transition shadow-sm backdrop-blur-sm"
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-white text-[#e63946] font-bold px-4 py-2 rounded-xl hover:bg-red-100 transition shadow"
        >
          🔐 Logout
        </button>
      </aside>

      <main className="relative flex-1 p-6 md:p-10 bg-[#ffd4d4] rounded-l-3xl shadow-inner overflow-hidden">
        <div className="relative z-10 text-black">
          <h1 className="text-5xl font-extrabold mb-10 font-['Poppins'] tracking-wide">👋 Welcome to Your Tasty Dashboard</h1>

          {userDetails && (
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4 text-[#ff4d4d]">👤 Profile Snapshot</h2>
              <div className="p-6 bg-[#f8cfcf] border border-[#f99] rounded-3xl shadow-md space-y-2">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Mobile:</strong> {userDetails.mobile || 'N/A'}</p>
                <p><strong>Status:</strong> {userDetails.status}</p>
                <p><strong>Role:</strong> {userDetails.role}</p>
                <p><strong>Last Login:</strong> {new Date(userDetails.last_login_date).toLocaleString()}</p>
              </div>
            </section>
          )}

          <section className="bg-[#f8cfcf] p-8 rounded-3xl shadow-xl border border-[#f99]">
            <h2 className="text-3xl font-semibold text-[#e63946] mb-6">📍 Add Your Delivery Spot</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(newAddress).map(([field, value]) => (
                <input
                  key={field}
                  value={value}
                  onChange={e => setNewAddress(prev => ({ ...prev, [field]: e.target.value }))}
                  placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  className="border border-gray-400 p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] bg-white text-black placeholder:italic"
                />
              ))}
            </div>

            <button
              onClick={handleAdd}
              className="bg-[#e60039] text-white px-6 py-3 rounded-full font-bold hover:bg-[#c9002b] transition shadow-lg"
            >
              ➕ Add Address
            </button>

            <ul className="space-y-5 mt-8">
              {addresses.map(address => (
                <li
                  key={address.id}
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-2xl border text-base shadow-md text-black ${
                    address.isActive ? 'bg-[#ffe6e6] border-[#e63946]' : 'bg-white border-[#f99]'
                  }`}
                >
                  <div className="mb-2 sm:mb-0">
                    <div className="font-bold text-xl text-[#d62828] animate-pulse">🏡 {address.address_name}</div>
                    <div className="text-gray-700">{address.address_line}, {address.city}, {address.state} - {address.pincode}, {address.country}</div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {!address.isActive && (
                      <button
                        onClick={() => handleSetActive(address.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
                      >
                        ✅ Set Active
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-sm"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;