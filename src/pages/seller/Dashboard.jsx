import React from 'react';
import { useAuth } from '../../context/AuthContext';

const SellerDashboard = () => {
  const { user } = useAuth();

  if (!user?.is_admin) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Access Denied</h2>
        <p className="text-gray-500">You need admin privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Seller Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to Seller Dashboard</h2>
        <p className="text-gray-600">
          This is the seller dashboard. In a complete implementation, you would see:
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
          <li>Sales analytics and reports</li>
          <li>Order management</li>
          <li>Product inventory</li>
          <li>Customer insights</li>
          <li>Real-time updates</li>
        </ul>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            <strong>Note:</strong> This is a basic version. Full seller dashboard features 
            would include charts, graphs, and real-time data from your Django backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;