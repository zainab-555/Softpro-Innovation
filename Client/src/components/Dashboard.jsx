import React, { useState } from 'react';
import { User, ShoppingBag, MapPin, Star, Heart, Download } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('My Profile');
  const [formData, setFormData] = useState({
    fullName: 'Pushkar Singh',
    email: 'singhpushkar7830@gmail.com',
    mobileNumber: '7830198385',
  });

  const sidebarItems = [
    { name: 'My Profile', icon: User },
    { name: 'My Orders', icon: ShoppingBag },
    { name: 'Saved Addresses', icon: MapPin },
    { name: 'My Reviews', icon: Star },
    { name: 'My Wishlist', icon: Heart },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Profile Data:', formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-200 bg-white p-6 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center p-1">
            <span className="text-center font-serif text-sm font-semibold leading-tight">
              Pushkar
              <br />
              Singh
            </span>
          </div>
        </div>

        {/* Profile Info */}
        <h2 className="text-xl font-serif font-bold text-gray-900">Pushkar Singh</h2>
        <p className="text-xs text-gray-500 mb-8">{formData.email}</p>

        {/* Navigation Menu */}
        <nav className="w-full space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-md transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-black border-l-4 border-black font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal profile and security preferences.
          </p>
        </header>

        {/* Settings Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm max-w-4xl">
          <section className="mb-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 pb-3 border-b border-gray-200">
              Personal Details
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm text-gray-800"
                />
              </div>

              {/* Email & Mobile Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm text-gray-800"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4 rotate-180" />
                  Save Profile Excellence
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;