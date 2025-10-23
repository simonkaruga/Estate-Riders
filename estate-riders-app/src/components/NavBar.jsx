import React from "react";
import { NavLink } from "react-router-dom"; // removed useLocation
import { Zap, Menu } from "lucide-react";

const NavBar = ({ user, onLogout }) => {
  const links = [
    { to: "/home", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800">Estate Riders</h1>
            <p className="text-xs text-gray-500">Electric Mobility Rentals</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-700"
                }`
              }
            >
              {l.label}
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

export default NavBar;
