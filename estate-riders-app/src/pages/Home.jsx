import React, { useState } from "react";
import VehicleCard from "../components/ItemCard";
import BookingForm from "../components/HireForm";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = ({ vehicles = [], onBookingConfirmed }) => {
  const [filter, setFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = vehicles.filter((v) =>
    filter === "all" ? true : v.type === filter
  );

  const handleBookingConfirmed = (booking) => {
    if (onBookingConfirmed) onBookingConfirmed(booking);
    setSelectedVehicle(null);
    alert("✅ Booking confirmed! Check 'My Bookings' to view details.");
  };

  const tabs = [
    { value: "all", label: "All Vehicles", icon: "🎯" },
    { value: "bike", label: "E-Bikes", icon: "🚴" },
    { value: "scooter", label: "Scooters", icon: "🛴" },
    { value: "skates", label: "Skates", icon: "⛸️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Rent • Ride • Repeat 🚴‍♂️
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the freedom of eco-friendly rides. Book an electric bike, scooter, or skates — anytime in your estate!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-200 shadow-sm ${
                filter === tab.value
                  ? "bg-emerald-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-emerald-100"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Vehicle List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      isSelected={selectedVehicle?.id === vehicle.id}
                      onSelect={() => setSelectedVehicle(vehicle)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="text-center bg-white rounded-2xl shadow p-10">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No vehicles available
                  </h3>
                  <p className="text-gray-500">
                    Try a different category or check back later.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <motion.div
              key={selectedVehicle ? selectedVehicle.id : "none"}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <BookingForm
                selectedVehicle={selectedVehicle}
                onBookingConfirmed={handleBookingConfirmed}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
