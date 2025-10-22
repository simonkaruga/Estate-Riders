import React, { useState } from "react";
import { Link } from "react-scroll";
import { Zap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", to: "hero" },
    { name: "Stats", to: "stats" },
    { name: "Values", to: "values" },
    { name: "Features", to: "features" },
    { name: "Team", to: "team" },
    { name: "Journey", to: "timeline" },
  ];

  return (
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
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80} // adjust for fixed navbar
              className="cursor-pointer text-gray-700 hover:text-emerald-600 font-medium"
              activeClass="text-emerald-600 border-b-2 border-emerald-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-emerald-600 focus:outline-none"
          >
            {isOpen ? <span className="text-2xl">&times;</span> : <span className="text-2xl">&#9776;</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
