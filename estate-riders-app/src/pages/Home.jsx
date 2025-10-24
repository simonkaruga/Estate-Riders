import React, { useEffect, useState, useRef } from "react";
import ItemCard from "../components/ItemCard";
import HireForm from "../components/HireForm";
import { apiGet } from "../api";

const HomePage = ({ onBookingConfirmed, currentUser }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const submitting = useRef(false);

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

  const filteredVehicles = vehicles.filter((v) =>
    filter === "all" ? true : v.type === filter
  );

  // Wrapper to prevent multiple submissions
  const handleBookingConfirmed = async (booking) => {
    // CRITICAL: Block if already submitting
    if (submitting.current) {
      console.log("⚠️ Submission blocked - already processing");
      return;
    }

    // Lock immediately
    submitting.current = true;

    try {
      //  Pass to parent handler (App.jsx)
      if (onBookingConfirmed) {
        await onBookingConfirmed(booking);
      }
      
      // Clear selection only after successful booking
      setSelectedVehicle(null);
    } catch (err) {
      console.error(" Booking submission failed:", err);
    } finally {
      //  Release after 3 seconds
      setTimeout(() => {
        submitting.current = false;
      }, 3000);
    }
  };

  const tabs = [
    { value: "all", label: "All Vehicles"},
    { value: "bike", label: "E-Bikes"},
    { value: "scooter", label: "Scooters"},
    { value: "skates", label: "Skates"},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Rent • Ride • Repeat
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the freedom of eco-friendly rides. Book an electric bike,
            scooter, or skates — anytime in your estate!
          </p>
        </div>

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
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading vehicles...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
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

            <div className="lg:col-span-1">
              <HireForm
                selectedVehicle={selectedVehicle}
                onBookingConfirmed={handleBookingConfirmed}
                currentUser={currentUser}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;