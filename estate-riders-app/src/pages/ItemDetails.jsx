import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Info } from "lucide-react";

const ItemDetails = ({ vehicles, onSelect }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find(v => v.id === parseInt(id));

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-xl mb-4">Vehicle not found</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleBookNow = () => {
    onSelect(vehicle);
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-emerald-600 font-medium hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Header Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Image */}
        <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
          {vehicle.image?.startsWith("http") ? (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-8xl">{vehicle.image}</div>
          )}
          {!vehicle.available && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Unavailable
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {vehicle.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500" />
            <span className="font-semibold">{vehicle.rating}/5</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 capitalize">{vehicle.type}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            Experience the thrill of eco-friendly mobility with the {vehicle.name}! 
            Whether you're cruising around the estate or heading to your next workout, 
            this {vehicle.type} offers top performance, comfort, and efficiency.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} className="text-emerald-600" />
              <span>{vehicle.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} className="text-emerald-600" />
              <span>${vehicle.price}/hr</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-emerald-600 mt-1" />
              <p className="text-gray-600 text-sm">
                All rides include complimentary safety gear and maintenance support.
                Please ensure you have your ID when picking up the vehicle.
              </p>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            disabled={!vehicle.available}
            className={`w-full py-3.5 text-white font-semibold rounded-lg transition shadow-lg ${
              vehicle.available
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {vehicle.available ? "Book Now" : "Currently Unavailable"}
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Features</h2>
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
