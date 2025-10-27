import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import AddItemForm from "../components/AddItemForm";

const CatalogPage = ({ items, onAddItem }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { key: "all", label: "All Items" },
    { key: "bike", label: "E-Bikes" },
    { key: "scooter", label: "Scooters" },
    { key: "skates", label: "Skates" },
  ];

  // Filter items by category
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.type === selectedCategory);

  // When an item is clicked
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowAddForm(false);
  };

  // When a new item is added
  const handleItemAdded = (newItem) => {
    onAddItem(newItem);
    setShowAddForm(false);
  };

  //  Render Item Details inline (instead of using separate component)
  const renderItemDetails = () => {
    if (!selectedItem) return null;

    const imageSrc = selectedItem.image
      ? selectedItem.image.startsWith("http")
        ? selectedItem.image
        : `${process.env.PUBLIC_URL}${selectedItem.image}`
      : "https://via.placeholder.com/400x500.png?text=No+Image";

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedItem(null)}
          className="flex items-center gap-2 text-emerald-600 font-medium hover:underline mb-6"
        >
          ← Back to Catalog
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              alt={selectedItem.name}
              className="w-full h-96 object-cover"
            />
            {selectedItem.available === false && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Unavailable
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedItem.name}
            </h2>
            <p className="text-gray-600 mb-4 capitalize">
              Category: {selectedItem.type}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">{selectedItem.rating ?? 4.5}/5</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Experience the thrill of eco-friendly mobility with the{" "}
              {selectedItem.name}! Whether you're cruising around the estate or
              heading to your next workout, this {selectedItem.type} offers top
              performance, comfort, and efficiency.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold"> Location:</span>
                <span>{selectedItem.location ?? "Estate Parking Zone A"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold"> Price:</span>
                <span>Ksh {selectedItem.price}/hr</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Eco-efficient electric motor</li>
                <li>• Long battery life (up to 50km)</li>
                <li>• Ergonomic comfort seat</li>
                <li>• Smart dashboard controls</li>
                <li>• Anti-slip tires</li>
                <li>• Includes maintenance & support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Our Catalog</h1>
        <button
          onClick={() => {
            setShowAddForm((prev) => !prev);
            setSelectedItem(null);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg shadow transition"
        >
          {showAddForm ? "Close Form" : "Add New Item"}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              selectedCategory === cat.key
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      {showAddForm ? (
        <div className="bg-white rounded-xl shadow p-6">
          <AddItemForm onAddItem={handleItemAdded} />
        </div>
      ) : selectedItem ? (
        renderItemDetails()
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                vehicle={item}
                onClick={() => handleItemClick(item)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No items found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;