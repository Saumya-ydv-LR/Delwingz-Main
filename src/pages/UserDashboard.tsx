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
      console.log("Access Token (DEV):", token);
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
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#e63946] text-white flex flex-col p-6 space-y-6 shadow-md">
        <nav className="flex flex-col gap-3 text-base font-semibold">
          {['🏠 Home', '📦 Orders', '📍 Addresses', '⚙️ Settings'].map((label) => (
            <a
              key={label}
              href="#"
              className="p-3 rounded transition hover:bg-white hover:text-[#e63946]"
            >
              {label}
            </a>
          ))}
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
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        {userDetails && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#e63946]">👤 User Info</h2>
            <div className="p-4 bg-gray-100 border rounded-md space-y-1">
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Mobile:</strong> {userDetails.mobile || 'N/A'}</p>
              <p><strong>Status:</strong> {userDetails.status}</p>
              <p><strong>Role:</strong> {userDetails.role}</p>
              <p><strong>Last Login:</strong> {new Date(userDetails.last_login_date).toLocaleString()}</p>
            </div>
          </section>
        )}

        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-[#e63946] mb-6">📍 Manage Addresses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {Object.entries(newAddress).map(([field, value]) => (
              <input
                key={field}
                value={value}
                onChange={e => setNewAddress(prev => ({ ...prev, [field]: e.target.value }))}
                placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                className="border border-gray-400 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#e63946] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#d62828] transition"
          >
            ➕ Add Address
          </button>

          <ul className="space-y-3 mt-6">
            {addresses.map(address => (
              <li
                key={address.id}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border text-sm shadow-sm ${
                  address.isActive ? 'bg-gray-100 border-[#e63946]' : 'bg-white border-gray-300'
                }`}
              >
                <div className="mb-2 sm:mb-0 text-base">
                  <div><strong>{address.address_name}</strong></div>
                  <div>{address.address_line}, {address.city}, {address.state} - {address.pincode}, {address.country}</div>
                </div>
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
