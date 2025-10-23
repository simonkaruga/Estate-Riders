import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';
import HireForm from '../components/HireForm';

const HomePage = ({ vehicles, onBookingConfirmed }) => {
  const [filter, setFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = vehicles.filter(v => 
    filter === 'all' ? true : v.type === filter
  );

  const handleBookingConfirmed = (booking) => {
    onBookingConfirmed(booking);
    setSelectedVehicle(null);
    alert('Booking confirmed! Check "My Bookings" to view details.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All Vehicles', icon: '🎯' },
          { value: 'bike', label: 'E-Bikes', icon: '🚴' },
          { value: 'scooter', label: 'Scooters', icon: '🛴' },
          { value: 'skates', label: 'Skates', icon: '⛸️' }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              filter === tab.value
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Vehicle List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredVehicles.map((vehicle) => (
            <ItemCard
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selectedVehicle?.id === vehicle.id}
              onSelect={setSelectedVehicle}
            />
          ))}
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <HireForm
            selectedVehicle={selectedVehicle}
            onBookingConfirmed={handleBookingConfirmed}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;