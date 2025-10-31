import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Bike,
  Users,
  Calendar,
  Settings,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  X,
  Save,
  Eye,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";

/* ---------- DUMMY DATA ---------- */
const initialVehicles = [
  { id: 1, name: "Electric Mountain Bike", type: "bike", price: 15, status: "available", condition: "excellent", battery: 95, location: "Main Gate" },
  { id: 2, name: "City E-Bike", type: "bike", price: 12, status: "available", condition: "good", battery: 80, location: "Community Center" },
  { id: 3, name: "Pro Electric Scooter", type: "scooter", price: 10, status: "rented", condition: "excellent", battery: 60, location: "Sports Complex" },
  { id: 4, name: "Urban Scooter", type: "scooter", price: 8, status: "maintenance", condition: "fair", battery: 30, location: "Park Entrance" },
  { id: 5, name: "Electric Roller Skates", type: "skates", price: 7, status: "available", condition: "good", battery: 88, location: "Main Gate" },
];

const initialBookings = [
  { id: 1, vehicleId: 3, vehicleName: "Pro Electric Scooter", userName: "John Doe", userEmail: "john@example.com", date: "2025-10-25", duration: 3, status: "active", total: 30 },
  { id: 2, vehicleId: 1, vehicleName: "Electric Mountain Bike", userName: "Jane Smith", userEmail: "jane@example.com", date: "2025-10-26", duration: 2, status: "completed", total: 30 },
  { id: 3, vehicleId: 2, vehicleName: "City E-Bike", userName: "Mike Johnson", userEmail: "mike@example.com", date: "2025-10-27", duration: 4, status: "upcoming", total: 48 },
];

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+254712345678", totalBookings: 15, totalSpent: 450, status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+254723456789", totalBookings: 8, totalSpent: 240, status: "active", joinDate: "2024-03-20" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+254734567890", totalBookings: 22, totalSpent: 660, status: "active", joinDate: "2023-11-10" },
];

/* ---------- VEHICLE MODAL COMPONENT ---------- */
const VehicleModal = ({ vehicle, onSave, onClose }) => {
  const [form, setForm] = useState(
    vehicle || {
      name: "",
      type: "bike",
      price: 0,
      status: "available",
      condition: "excellent",
      battery: 100,
      location: "Main Gate",
    }
  );

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Vehicle Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            <Select label="Type" value={form.type} onChange={(e) => handleChange("type", e.target.value)} options={["bike", "scooter", "skates"]} />
            <Input label="Price (per hour)" type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
            <Select label="Status" value={form.status} onChange={(e) => handleChange("status", e.target.value)} options={["available", "rented", "maintenance"]} />
            <Select label="Condition" value={form.condition} onChange={(e) => handleChange("condition", e.target.value)} options={["excellent", "good", "fair"]} />
            <Input label="Battery (%)" type="number" value={form.battery} min="0" max="100" onChange={(e) => handleChange("battery", e.target.value)} />
            <Select label="Location" value={form.location} onChange={(e) => handleChange("location", e.target.value)} options={["Main Gate", "Community Center", "Sports Complex", "Park Entrance"]} />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(form)} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2">
            <Save size={18} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};


/* ---------- SMALL UI HELPERS ---------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input {...props} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select {...props} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 capitalize">
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

/* ---------- MAIN DASHBOARD ---------- */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [bookings, setBookings] = useState(initialBookings);
  const [users] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = useMemo(() => ({
    totalRevenue: bookings.reduce((sum, b) => sum + b.total, 0),
    totalBookings: bookings.length,
    activeVehicles: vehicles.filter((v) => v.status === "available").length,
    totalUsers: users.length,
  }), [vehicles, bookings, users]);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "vehicles", name: "Vehicles", icon: Bike },
    { id: "bookings", name: "Bookings", icon: Calendar },
    { id: "users", name: "Users", icon: Users },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const openModal = (item = null) => {
    setEditing(item);
    setShowModal(true);
  };

  const saveVehicle = (vehicle) => {
    setVehicles((prev) =>
      editing
        ? prev.map((v) => (v.id === editing.id ? { ...vehicle, id: editing.id } : v))
        : [...prev, { ...vehicle, id: Date.now() }]
    );
    setShowModal(false);
    setEditing(null);
  };

  const deleteVehicle = (id) => {
    if (window.confirm("Delete this vehicle?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {showModal && <VehicleModal vehicle={editing} onSave={saveVehicle} onClose={() => setShowModal(false)} />}

      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-emerald-600 to-teal-600 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} relative`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu size={20} />
          </button>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 ${
                activeTab === item.id ? "bg-white/20 border-r-4 border-white" : ""
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        <button className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-4 py-3 hover:bg-white/10 rounded-lg">
          <LogOut size={20} />
          {sidebarOpen && "Logout"}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{navigation.find((n) => n.id === activeTab)?.name}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* TAB CONTENTS */}
        <div className="p-6">
          {activeTab === "dashboard" && <Dashboard stats={stats} bookings={bookings} vehicles={vehicles} />}
          {activeTab === "vehicles" && <VehiclesTab vehicles={vehicles} search={search} setSearch={setSearch} openModal={openModal} deleteVehicle={deleteVehicle} />}
        </div>
      </main>
    </div>
  );
}

/* ---------- DASHBOARD TAB COMPONENT ---------- */
const Dashboard = ({ stats, bookings, vehicles }) => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon={DollarSign} color="emerald" change="+12%" />
      <StatCard title="Total Bookings" value={stats.totalBookings} icon={Calendar} color="blue" change="+8%" />
      <StatCard title="Active Vehicles" value={stats.activeVehicles} icon={Bike} color="purple" />
      <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="orange" change="+15%" />
    </div>
  </div>
);

const StatCard = ({ title, value, icon: Icon, color, change }) => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className="flex justify-between items-center mb-3">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <Icon className={`text-${color}-600`} size={24} />
      </div>
      {change && <span className={`text-${color}-600 text-sm font-semibold`}>{change}</span>}
    </div>
    <h3 className="text-sm text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);
