import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Package, LogOut, Bike, Info } from "lucide-react";

function NavBar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-1 rounded ${
      isActive ? "bg-white text-blue-600 font-semibold" : "hover:bg-blue-500"
    }`;

  return (
    <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <Bike size={24} />
        <h1 className="text-xl font-bold">Estate Riders</h1>
      </div>

      <nav className="flex gap-2 flex-wrap">
        <NavLink to="/" className={linkClass} end>
          <Home size={16} /> Home
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          <Info size={16} /> About
        </NavLink>

        <NavLink to="/catalog" className={linkClass}>
          <Package size={16} /> Catalog
        </NavLink>

        <NavLink to="/hire" className={linkClass}>
          <ShoppingCart size={16} /> Hire
        </NavLink>
      </nav>

      <NavLink to="/login" className="mt-2 md:mt-0 flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
        <LogOut size={16} /> Logout
      </NavLink>
    </header>
  );
}

export default NavBar;
