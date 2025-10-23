import React from "react";
import { motion } from "framer-motion";
import {  Battery, Clock, MapPin } from "lucide-react";

const ItemCard = ({ vehicle, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl shadow-md transition-all cursor-pointer overflow-hidden border-2 ${
        isSelected
          ? "border-emerald-600 shadow-lg bg-emerald-50"
          : "border-transparent bg-white hover:shadow-lg"
      }`}
      onClick={() => onSelect(vehicle)}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 bg-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          {vehicle.type.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {vehicle.description || "Experience a smooth and quiet ride."}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
          <div className="flex items-center gap-2">
            <Battery size={18} className="text-emerald-600" />
            <span>{vehicle.range || "20 km range"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-emerald-600" />
            <span>{vehicle.duration || "Per hour"}</span>
          </div>
        </div>

        {/* Price & Location */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-semibold text-emerald-700">
            KSh {vehicle.price}/hr
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin size={16} />
            <span>{vehicle.location || "Estate Central"}</span>
          </div>
        </div>
      </div>

      {/* Select Indicator */}
      {isSelected && (
        <div className="bg-emerald-600 text-white text-center py-2 font-semibold">
          Selected ✅
        </div>
      )}
    </motion.div>
  );
};

export default ItemCard;
