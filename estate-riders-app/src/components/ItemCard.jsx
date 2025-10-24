import React from "react";

const ItemCard = ({ vehicle, item, isSelected, onSelect, onClick }) => {
  // Allow for either "vehicle" or "item" prop
  const data = vehicle || item;

  if (!data) return null; // Prevent crashes

  const fallbackImage =
    "https://via.placeholder.com/300x200.png?text=No+Image";

  const imageSrc = data.image
    ? data.image.startsWith("http")
      ? data.image
      : `${process.env.PUBLIC_URL}${data.image}`
    : fallbackImage;

  return (
    <div
      onClick={() => {
        if (onSelect) onSelect(data);
        if (onClick) onClick(data);
      }}
      className={`cursor-pointer border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition transform hover:-translate-y-1 ${
        isSelected ? "border-emerald-500 ring-2 ring-emerald-300" : "border-gray-200"
      }`}
    >
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={imageSrc}
          alt={data.name}
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => (e.target.src = fallbackImage)}
        />
      </div>

      <h3 className="text-lg font-bold text-gray-800">{data.name}</h3>
      <p className="text-sm text-gray-500 capitalize">{data.type}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-emerald-600 font-semibold">
          Ksh{data.price ?? "N/A"}/hr
        </span>
        <button
          className={`text-sm px-3 py-1 rounded-lg ${
            isSelected
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isSelected ? "Selected" : "View"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
