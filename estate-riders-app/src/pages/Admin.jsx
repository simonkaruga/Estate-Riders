import React, { useState } from "react";
import {
  LayoutDashboard,
  Bike,
  Users,
  Calendar,
  Settings,
  TrendingUp,
  Plus,
  Trash2,
  X,
  Save,
  Eye,
  Bell,
  LogOut,
  Menu
} from "lucide-react";

const VehicleModal = ({ vehicle, onSave, onClose }) => {
  const [formData, setFormData] = useState(
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

  const handleSave = () => {
    if (!formData.name) {
      alert("Vehicle name is required!");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="skates">Skates</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (per hour)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.battery}
                onChange={(e) =>
                  setFormData({ ...formData, battery: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option>Main Gate</option>
                <option>Community Center</option>
                <option>Sports Complex</option>
                <option>Park Entrance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600"
          >
            <Save className="inline mr-2" size={18} />
            Save Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard({
  vehicles = [],
  bookings = [],
  users = [],
  onSaveVehicle,
  onDeleteVehicle,
  onUpdateBooking,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const stats = {
    totalRevenue: bookings.reduce((sum, b) => sum + (b.total || 0), 0),
    totalBookings: bookings.length,
    activeVehicles: vehicles.filter((v) => v.status === "available").length,
    totalUsers: users.length,
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSaveVehicle = (vehicle) => {
    onSaveVehicle(vehicle, editingItem?.id);
    closeModal();
  };

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "vehicles", name: "Vehicles", icon: Bike },
    { id: "bookings", name: "Bookings", icon: Calendar },
    { id: "users", name: "Users", icon: Users },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {showModal && (
        <VehicleModal
          vehicle={editingItem}
          onSave={handleSaveVehicle}
          onClose={closeModal}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-emerald-600 to-teal-600 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition ${
                activeTab === item.id ? "bg-white/20 border-r-4 border-white" : ""
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Dashboard content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {navigation.find((n) => n.id === activeTab)?.name}
            </h2>
            <p className="text-sm text-gray-600">Manage your estate riders platform</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* Dashboard Tabs */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">${stats.totalRevenue}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Active Vehicles</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.activeVehicles}/{vehicles.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
              </div>
            </div>
          )}

          {activeTab === "vehicles" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => openModal()}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600"
                >
                  <Plus size={20} />
                  Add Vehicle
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {vehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {v.name}
                        </td>
                        <td className="px-6 py-4 text-gray-700 capitalize">{v.type}</td>
                        <td className="px-6 py-4 text-gray-700">${v.price}/hr</td>
                        <td className="px-6 py-4 text-gray-700">{v.status}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => openModal(v)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteVehicle(v.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
