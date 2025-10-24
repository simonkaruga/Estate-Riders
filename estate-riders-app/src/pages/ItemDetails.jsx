import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Info,
  CheckCircle,
} from "lucide-react";

const ItemDetails = ({ vehicles, onBookNow, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [hideToast, setHideToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const bookingInProgress = useRef(false);

  // Find the item from vehicles array
  const item = vehicles.find((v) => String(v.id) === String(id));

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-xl mb-4">Item not found</p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const displayToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setHideToast(false);

    setTimeout(() => setHideToast(true), 3500);
    setTimeout(() => {
      setShowToast(false);
      setHideToast(false);
    }, 4000);
  };

  const handleBookNow = async () => {
  if (bookingInProgress.current) return;

  if (!currentUser) {
    displayToast("Please log in to make a booking.", "error");
    return;
  }

  bookingInProgress.current = true;

  try {
    const booking = {
      userId: String(currentUser.id),       // Force string
      vehicleId: String(item.id),           // Force string
      vehicleName: item.name,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      duration: "1",
      total: item.price,
      status: "confirmed",                  // Matches your db
      createdAt: new Date().toISOString(),
    };

    if (onBookNow) {
      await onBookNow(booking);
    } else {
      throw new Error("Booking function not available");
    }
  } catch (err) {
    console.error("Booking error:", err);
    displayToast(err.message || "Booking failed.", "error");
  } finally {
    setTimeout(() => {
      bookingInProgress.current = false;
    }, 3000);
  }
};


  const imageSrc = item.image
    ? item.image.startsWith("http")
      ? item.image
      : `${process.env.PUBLIC_URL}${item.image}`
    : "https://via.placeholder.com/400x400.png?text=No+Image";

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-10">
      {/* Toast */}
      {showToast && (
        <div
          className={`fixed top-24 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
            toastType === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          } ${hideToast ? "opacity-0 transition-opacity duration-500" : ""}`}
        >
          <CheckCircle size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 text-emerald-600 font-medium hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.available === false && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Unavailable
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {item.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500" />
            <span className="font-semibold">{item.rating ?? 4.5}/5</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 capitalize">{item.type}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            Experience the thrill of eco-friendly mobility with the {item.name}!
            Whether you're cruising around the estate or heading to your next
            workout, this {item.type} offers top performance, comfort, and
            efficiency.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} className="text-emerald-600" />
              <span>{item.location ?? "Estate Parking Zone A"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} className="text-emerald-600" />
              <span>Ksh {item.price}/hr</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-emerald-600 mt-1" />
              <p className="text-gray-600 text-sm">
                All rides include complimentary safety gear and maintenance
                support. Please ensure you have your ID when picking up the
                item.
              </p>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            disabled={item.available === false || bookingInProgress.current}
            className={`w-full py-3.5 text-white font-semibold rounded-lg transition shadow-lg ${
              item.available !== false && !bookingInProgress.current
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {bookingInProgress.current
              ? "Processing..."
              : item.available !== false
              ? "Book Now"
              : "Currently Unavailable"}
          </button>
        </div>
      </div>

      <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Item Features
        </h2>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
          <li>Eco-efficient electric motor</li>
          <li>Long battery life (up to 50km)</li>
          <li>Ergonomic comfort seat</li>
          <li>Smart dashboard controls</li>
          <li>Anti-slip tires</li>
          <li>Includes maintenance & support</li>
        </ul>
      </div>
    </div>
  );
};

export default ItemDetails;