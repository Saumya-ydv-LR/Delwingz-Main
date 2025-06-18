import React, { useState } from 'react';
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
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Manage Addresses</h2>
          <div className="flex gap-2">
            <input
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              placeholder="Enter address"
              className="flex-grow border border-red-300 p-2 rounded"
            />
            <button
              onClick={handleAdd}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {addresses.map(address => (
            <li
              key={address.id}
              className={`flex justify-between items-center p-4 rounded border ${
                address.isActive ? 'bg-red-100 border-red-500' : 'border-gray-300'
              }`}
            >
              <span className="text-gray-800">{address.text}</span>
              <div className="flex gap-2">
                {!address.isActive && (
                  <button
                    onClick={() => handleSetActive(address.id)}
                    className="text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Set Active
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
