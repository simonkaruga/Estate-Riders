import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPatch, apiDelete } from "./api";

import Login from "./pages/LogIn";
import Home from "./pages/Home";
import About from "./pages/About";
import CatalogPage from "./pages/Catalog";
import ItemDetails from "./pages/ItemDetails";
import AdminDashboard from "./pages/Admin";
import NavBar from "./components/NavBar";

function App() {
  const navigate = useNavigate();

  // 🔹 Global State
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load all data from API or JSON Server
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, vehiclesData, bookingsData] = await Promise.all([
          apiGet("users"),
          apiGet("vehicles"),
          apiGet("bookings"),
        ]);
        setUsers(usersData);
        setVehicles(vehiclesData);
        setBookings(bookingsData);
      } catch (err) {
        console.error("❌ Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 🔹 Restore user session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // =====================================================
  // LOGIN / SIGNUP
  // =====================================================
  const handleLogin = async ({ email, password }) => {
    try {
      const usersData = await apiGet("users");
      const found = usersData.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!found) throw new Error("User not found");
      if (found.password !== password) throw new Error("Invalid password");

      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));

      // ✅ Redirect based on role
      if (found.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignup = async ({ email, password, role = "user" }) => {
    try {
      const data = await apiGet("users");
      if (data.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("User already exists");
      }

      const newUser = {
        name: email.split("@")[0],
        email,
        password,
        totalBookings: 0,
        totalSpent: 0,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        role, // user or admin
      };

      await apiPost("users", newUser);
      alert("Signup successful! You can now login.");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // =====================================================
  // BOOKINGS
  // =====================================================
  const addBooking = async (booking) => {
    try {
      await apiPost("bookings", booking);
      setBookings((prev) => [...prev, booking]);
      alert("✅ Booking confirmed!");
    } catch (err) {
      alert("Failed to save booking: " + err.message);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await apiDelete("bookings", id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to cancel booking: " + err.message);
    }
  };

  // =====================================================
  // VEHICLES CRUD
  // =====================================================
  const addOrUpdateVehicle = async (vehicle, editingId = null) => {
    try {
      if (editingId) {
        await apiPatch("vehicles", editingId, vehicle);
        setVehicles((v) =>
          v.map((x) => (x.id === editingId ? { ...x, ...vehicle } : x))
        );
      } else {
        const newVehicle = await apiPost("vehicles", vehicle);
        setVehicles((v) => [...v, newVehicle]);
      }
    } catch (err) {
      alert("Vehicle save failed: " + err.message);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await apiDelete("vehicles", id);
      setVehicles((v) => v.filter((x) => x.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        🚴‍♂️ Loading Estate Riders data...
      </div>
    );
  }

  // =====================================================
  // ROUTES
  // =====================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <NavBar user={user} onLogout={handleLogout} />

      <main className={user ? "pt-20" : "pt-8"}>
        <Routes>
          {/* Default Login Route */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to={user.role === "admin" ? "/admin" : "/home"} />
              ) : (
                <Login onLogin={handleLogin} onSignup={handleSignup} />
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to={user.role === "admin" ? "/admin" : "/home"} />
              ) : (
                <Login onLogin={handleLogin} onSignup={handleSignup} />
              )
            }
          />

          {/* Home (for users) */}
          <Route
            path="/home"
            element={
              user ? (
                <Home vehicles={vehicles} onBookingConfirmed={addBooking} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Catalog Page */}
          <Route
            path="/catalog"
            element={<CatalogPage items={vehicles} onAddItem={addOrUpdateVehicle} />}
          />

          {/* Item Details */}
          <Route path="/item/:id" element={<ItemDetails vehicles={vehicles} />} />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* ✅ Admin Dashboard (protected) */}
          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard
                  vehicles={vehicles}
                  bookings={bookings}
                  users={users}
                  onSaveVehicle={addOrUpdateVehicle}
                  onDeleteVehicle={deleteVehicle}
                  onCancelBooking={cancelBooking}
                  onUpdateBooking={(b) =>
                    setBookings((prev) => prev.map((x) => (x.id === b.id ? b : x)))
                  }
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={<Navigate to={user ? "/home" : "/login"} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
