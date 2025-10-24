import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import HireForm from "../components/HireForm";
import { apiGet, apiPost } from "../api";

const HomePage = ({ onBookingConfirmed }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vehicles from JSON Server or Render API
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const data = await apiGet("vehicles");
        setVehicles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles. Please check your server.");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  // Filtered vehicles based on selected category
  const filteredVehicles = vehicles.filter((v) =>
    filter === "all" ? true : v.type === filter
  );

  // Handle booking creation
  const handleBookingConfirmed = async (booking) => {
    try {
      const newBooking = await apiPost("bookings", booking);
      if (onBookingConfirmed) onBookingConfirmed(newBooking);
      setSelectedVehicle(null);
      alert("Booking confirmed! Check 'My Bookings' to view details.");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to confirm booking. Please try again.");
    }
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
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Rent • Ride • Repeat 
            Rent • Ride • Repeat 
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the freedom of eco-friendly rides. Book an electric bike,
            scooter, or skates — anytime in your estate!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
                filter === tab.value
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading / Error / Data */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading vehicles...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Vehicle List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <ItemCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isSelected={selectedVehicle?.id === vehicle.id}
                    onSelect={setSelectedVehicle}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No vehicles available.</p>
              )}
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <HireForm
                selectedVehicle={selectedVehicle}
                onBookingConfirmed={handleBookingConfirmed}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
