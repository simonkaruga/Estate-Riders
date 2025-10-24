import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams(); // get bike ID from URL
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);

  // Temporary sample data (replace with API later)
  const sampleBikes = [
    {
      id: "1",
      name: "Electric Mountain Bike",
      type: "bike",
      price: "kes 2500/day",
      rating: 4.5,
      location: "Nairobi Estate",
      description:
        "A robust electric mountain bike perfect for off-road adventures and city commuting.",
      image:
        "https://example.com/images/electric-mountain-bike.jpg",
        availability: true,
    },
    {
      id: "2",
      name: "City Cruiser E-Bike",
      type: "bike",
      price: "kes 2000/day",
      rating: 4.0,
      location: "Nairobi City Center",
      description:
        "A stylish city cruiser e-bike ideal for urban commuting and leisurely rides.",
      image:
        "https://example.com/images/city-cruiser-e-bike.jpg",
      availability: true,
    },
    {
      id: "3",
      name: "Folding Electric Bike",
      type: "bike",
      price: "kes 2200/day",
      rating: 4.2,
      location: "Westlands Estate",
      description:
        "A compact folding electric bike that is easy to store and perfect for short trips.",
      image:
        "https://example.com/images/folding-electric-bike.jpg",
      availability: false,
    },
    {
      id: "4",
      name: "Road Bike",
      type: "bike",
      price: "kes 3000/day",
      rating: 4.8,
      location: "Nairobi CBD",
      description:
        "A lightweight road bike designed for speed and efficiency on paved surfaces.",
      image:
        "https://example.com/images/road-bike.jpg",
      availability: true,
    },
    {
      id: "5",
      name: "Hybrid Bike",
      type: "bike",
      price: "kes 2800/day",
      rating: 4.6,
      location: "Nairobi West",
      description:
        "A versatile hybrid bike suitable for both city commuting and light off-road trails.",
      image:
        "https://example.com/images/hybrid-bike.jpg",
      availability: true,
    }
  ];

  useEffect(() => {
    // Simulate fetching data by ID
    const foundBike = sampleBikes.find((item) => item.id === id);
    setBike(foundBike);
  }, [id]);

  if (!bike) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading bike details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{bike.name}</h1>
          <p className="text-gray-500 mb-4">{bike.location}</p>

          <p className="text-gray-700 mb-4">{bike.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-green-600">
              {bike.price}
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
