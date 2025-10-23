import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Zap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Hire", to: "/hire" },
    { name: "Login", to: "/login" },
  ];

  return (
    <div>
      <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <Zap className="text-emerald-600 mr-2" size={28} />
          <span className="font-bold text-xl text-gray-800">Estate Riders</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `cursor-pointer text-gray-700 hover:text-emerald-600 font-medium ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-emerald-600 focus:outline-none"
          >
            {isOpen ? <span className="text-2xl">×</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  </div>
  );
};

export default Navbar;
