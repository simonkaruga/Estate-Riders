import React from "react";
import { Home, Plus, ShoppingCart, Package, LogOut, Bike } from "lucide-react";clear
function NavBar({ currentRoute, navigate, user, onLogout }) {
  return (
    <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <Bike size={24} />
        <h1 className="text-xl font-bold">Estate Riders</h1>
      </div>

      <nav className="flex gap-2 flex-wrap">
        <NavButton label="Home" icon={<Home size={16} />} active={currentRoute === "home"} onClick={() => navigate("home")} />
        <NavButton label="Add" icon={<Plus size={16} />} active={currentRoute === "add"} onClick={() => navigate("add")} />
        <NavButton label="Hire" icon={<ShoppingCart size={16} />} active={currentRoute === "hire"} onClick={() => navigate("hire")} />
        <NavButton label="My Rentals" icon={<Package size={16} />} active={currentRoute === "rentals"} onClick={() => navigate("rentals")} />
      </nav>

      <button
        onClick={onLogout}
        className="mt-2 md:mt-0 flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        <LogOut size={16} /> Logout
      </button>
    </header>
  );
}

function NavButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1 rounded ${
        active ? "bg-white text-blue-600 font-semibold" : "hover:bg-blue-500"
      }`}
    >
      {icon} {label}
    </button>
  );
}

export default NavBar;
