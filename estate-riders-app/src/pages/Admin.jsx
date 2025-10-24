import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Bike,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  X,
  Save,
  Bell,
  Menu
} from "lucide-react";
import { apiGet } from "../api";

//  Modal for vehicle add/edit
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
                Price (KSh per hour)
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

//  Main Admin Dashboard
export default function AdminDashboard({
  vehicles = [],
  bookings = [],
  users = [],
  onSaveVehicle,
  onDeleteVehicle,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [latestData, setLatestData] = useState({ vehicles, bookings, users });

  // Auto-refresh from JSON Server when data changes
  useEffect(() => {
    const refresh = async () => {
      try {
        const [v, b, u] = await Promise.all([
          apiGet("vehicles"),
          apiGet("bookings"),
          apiGet("users"),
        ]);
        setLatestData({ vehicles: v, bookings: b, users: u });
      } catch (err) {
        console.error("Error refreshing admin data:", err);
      }
    };
    refresh();

    const interval = setInterval(refresh, 8000); // auto-refresh every 8s
    return () => clearInterval(interval);
  }, [bookings, vehicles]);

  const stats = {
    totalRevenue: latestData.bookings.reduce((sum, b) => sum + (b.total || 0), 0),
    totalBookings: latestData.bookings.length,
    activeVehicles: latestData.vehicles.filter((v) => v.status === "available").length,
    totalUsers: latestData.users.length,
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

        {/* Nav links */}
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {navigation.find((n) => n.id === activeTab)?.name}
            </h2>
            <p className="text-sm text-gray-600">
              Manage your Estate Riders platform
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* ======= TAB CONTENTS ======= */}
        <div className="p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">
                  KSh {stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Active Vehicles</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.activeVehicles}/{latestData.vehicles.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
              </div>
            </div>
          )}

          {/* Vehicles */}
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {latestData.vehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">{v.name}</td>
                        <td className="px-6 py-4 capitalize">{v.type}</td>
                        <td className="px-6 py-4">KSh {v.price.toLocaleString()}</td>
                        <td className="px-6 py-4">{v.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

{/*  BOOKINGS TAB */}
{activeTab === "bookings" && (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">All Bookings</h3>

    {latestData.bookings.length === 0 ? (
      <p className="text-gray-500 text-center py-8">
        No bookings found.
      </p>
    ) : (
      <table className="w-full border">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
              User
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
              Vehicle
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
              Total (KSh)
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
              Date
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {latestData.bookings.map((b) => {
            // Get user name via userId
            const user = latestData.users.find((u) => u.id === b.userId);
            const userName = user ? user.name : "Unknown User";

            // Get vehicle name via vehicleId
            const vehicle = latestData.vehicles.find((v) => v.id === b.vehicleId);
            const vehicleName = vehicle ? vehicle.name : "Unknown Vehicle";

            return (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{userName}</td>
                <td className="px-4 py-2">{vehicleName}</td>
                <td className="px-4 py-2">KSh {b.total?.toLocaleString() || "0"}</td>
                <td className="px-4 py-2">{b.date || "—"}</td>
                <td className="px-4 py-2 capitalize text-emerald-600 font-medium">
                  {b.status || "pending"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
)}
          {/* Users */}
          {activeTab === "users" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Registered Users</h3>
              <table className="w-full border">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {latestData.users.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2 capitalize">{u.role}</td>
                      <td className="px-4 py-2">{u.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Analytics */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
              <p className="text-gray-700">
                <strong>Total Revenue:</strong> KSh {stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Total Bookings:</strong> {stats.totalBookings}
              </p>
              <p className="text-gray-700">
                <strong>Average per Booking:</strong>{" "}
                KSh{" "}
                {stats.totalBookings
                  ? Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString()
                  : 0}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
