import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { apiPost } from "../api"; //  make sure this import exists

const HireForm = ({ selectedVehicle, onBookingConfirmed }) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    duration: "1",
    location: "Main Gate",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!selectedVehicle) {
      setError("Please select a vehicle first.");
      return;
    }

    if (!bookingDetails.date) {
      setError("Please choose a booking date.");
      return;
    }

    if (!loggedInUser) {
      setError("You must be logged in to book a vehicle.");
      return;
    }

    try {
      const totalCost = selectedVehicle.price * parseInt(bookingDetails.duration);

      const newBooking = {
        id: Date.now().toString(),
        userId: loggedInUser.id,          // link to user in JSON
        vehicleId: selectedVehicle.id,    //  link to vehicle in JSON
        total: totalCost,
        date: bookingDetails.date,
        duration: bookingDetails.duration,
        location: bookingDetails.location,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      //  Save to JSON server
      await apiPost("bookings", newBooking);

      // Pass back to parent for UI refresh
      onBookingConfirmed(newBooking);

      setSubmitted(true);
      setError("");

      // Reset form after confirmation
      setBookingDetails({
        date: "",
        duration: "1",
        location: "Main Gate",
      });

      setTimeout(() => setSubmitted(false), 2500);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to confirm booking. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6 sticky top-20"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Book Your Ride
      </h2>

      {/* No Vehicle Selected */}
      {!selectedVehicle ? (
        <div className="text-center py-16">
          <Bike className="mx-auto text-gray-300 mb-4" size={70} />
          <p className="text-gray-500 text-lg font-medium">
            Select a vehicle to get started
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <CheckCircle
                className="mx-auto text-emerald-600 mb-4"
                size={70}
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600">
                Your {selectedVehicle.name} is ready for you.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Vehicle Preview */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {selectedVehicle.name}
                  </h3>
                  <p className="text-emerald-600 font-bold">
                    KSh {selectedVehicle.price}/hr
                  </p>
                </div>
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar
                    size={16}
                    className="inline mr-1 text-emerald-600"
                  />
                  Date *
                </label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock
                    size={16}
                    className="inline mr-1 text-emerald-600"
                  />
                  Duration (hours)
                </label>
                <select
                  value={bookingDetails.duration}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      duration: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 6, 8, 12, 24].map((h) => (
                    <option key={h} value={h}>
                      {h} hour{h > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1 text-emerald-600" />
                  Pickup Location
                </label>
                <select
                  value={bookingDetails.location}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option>Main Gate</option>
                  <option>Community Center</option>
                  <option>Sports Complex</option>
                  <option>Park Entrance</option>
                </select>
              </div>

              {/* Error Feedback */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Cost:</span>
                <span className="text-2xl font-bold text-emerald-600">
                  KSh {selectedVehicle.price * parseInt(bookingDetails.duration || 1)}
                </span>
              </div>

              {/* Submit */}
              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Confirm Booking
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default HireForm;
