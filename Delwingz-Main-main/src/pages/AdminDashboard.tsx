import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logic to clear session if needed
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-100 p-6 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-red-700">Add Product</h2>
            <p className="text-gray-700">Add new products to your catalog easily.</p>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Add</button>
          </div>

          <div className="bg-red-100 p-6 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-red-700">Manage Products</h2>
            <p className="text-gray-700">Edit or delete your existing products.</p>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
