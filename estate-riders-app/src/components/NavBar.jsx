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

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-emerald-500 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="hidden md:block">
              <NavLink
                to="/login"
                className="px-3 py-2 bg-emerald-500 text-white rounded-lg"
              >
                Login
              </NavLink>
            </div>
          )}

          <div className="md:hidden">
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
