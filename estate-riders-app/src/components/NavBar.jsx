import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";

const NavBar = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseLinks = [
    { to: "/home", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/about", label: "About" },
  ];

  // Show admin tab if logged in as admin
  const links = user?.role === "admin"
    ? [...baseLinks, { to: "/admin", label: "Admin" }]
    : baseLinks;

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800">Estate Riders</h1>
            <p className="text-xs text-gray-500">Electric Mobility Rentals</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* User / Logout - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {/* User Info - Mobile */}
            {user && (
              <div className="pb-3 border-b border-gray-200">
                <div className="text-sm font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            )}

            {/* Navigation Links - Mobile */}
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            {/* Logout Button - Mobile */}
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;