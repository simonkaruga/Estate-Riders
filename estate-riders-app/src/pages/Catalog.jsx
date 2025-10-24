import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';
import AddItemForm from '../components/AddItemForm';
import ItemDetails from './ItemDetails';

const CatalogPage = ({ items, onAddItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'bike', label: 'E-Bikes' },
    { key: 'scooter', label: 'Scooters' },
    { key: 'skates', label: 'Skates' },
  ];

  // Filter items by category
  const filteredItems =
    selectedCategory === 'all'
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Our Catalog</h1>
        <button
          onClick={() => {
            setShowAddForm((prev) => !prev);
            setSelectedItem(null);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg shadow transition"
        >
          {showAddForm ? 'Close Form' : '➕ Add New Item'}
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
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
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
        <ItemDetails item={selectedItem} onBack={() => setSelectedItem(null)} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
