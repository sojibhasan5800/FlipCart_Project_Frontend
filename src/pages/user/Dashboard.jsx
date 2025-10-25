import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, User, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.first_name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/my-orders"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition duration-200"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition duration-200"
                >
                  <Settings className="w-5 h-5" />
                  <span>Edit Profile</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Orders Card */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">0</h3>
                <p className="text-gray-600">Total Orders</p>
                <Link
                  to="/my-orders"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                >
                  View Orders
                </Link>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600 text-sm">{user.phone_number}</p>
                <Link
                  to="/profile"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity</p>
                <Link
                  to="/store"
                  className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;