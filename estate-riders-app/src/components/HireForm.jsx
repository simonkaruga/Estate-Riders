import React, { useState } from 'react';
import { Bike } from 'lucide-react';

const HireForm = ({ selectedVehicle, onBookingConfirmed }) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    date: '',
    duration: '1',
    location: 'Main Gate'
  });

  const handleBooking = () => {
    if (!selectedVehicle || !bookingDetails.name || !bookingDetails.date) {
      alert('Please fill in all required fields');
      return;
    }

    const newBooking = {
      id: Date.now(),
      vehicle: selectedVehicle,
      ...bookingDetails,
      total: selectedVehicle.price * parseInt(bookingDetails.duration),
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };

    onBookingConfirmed(newBooking);
    setBookingDetails({ name: '', date: '', duration: '1', location: 'Main Gate' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Ride</h2>
      
      {selectedVehicle ? (
        <div className="space-y-5">
          {/* Selected Vehicle Preview */}
          <div className="bg-emerald-50 rounded-lg p-4 mb-4">
            <div className="text-4xl mb-2">{selectedVehicle.image}</div>
            <div className="font-bold text-gray-800">{selectedVehicle.name}</div>
            <div className="text-emerald-600 font-semibold">${selectedVehicle.price}/hr</div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
            <input
              type="text"
              value={bookingDetails.name}
              onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input
              type="date"
              value={bookingDetails.date}
              onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
            <select
              value={bookingDetails.duration}
              onChange={(e) => setBookingDetails({...bookingDetails, duration: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {[1,2,3,4,5,6,8,12,24].map(h => (
                <option key={h} value={h}>{h} hour{h>1?'s':''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
            <select
              value={bookingDetails.location}
              onChange={(e) => setBookingDetails({...bookingDetails, location: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option>Main Gate</option>
              <option>Community Center</option>
              <option>Sports Complex</option>
              <option>Park Entrance</option>
            </select>
          </div>

          {/* Total Cost */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Cost:</span>
              <span className="text-2xl font-bold text-emerald-600">
                ${selectedVehicle.price * parseInt(bookingDetails.duration)}
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-lg font-bold hover:from-emerald-600 hover:to-teal-600 transition shadow-lg"
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <div className="text-center py-12">
          <Bike className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500">Select a vehicle to book</p>
        </div>
      )}
    </div>
  );
};

export default HireForm;