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
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all data from the JSON Server (local or remote)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, vehiclesData, bookingsData] = await Promise.all([
          apiGet("users"),
          apiGet("vehicles"),
          apiGet("bookings")
        ]);
        setUsers(usersData);
        setVehicles(vehiclesData);
        setBookings(bookingsData);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // LOGIN / SIGNUP FUNCTIONS
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await apiGet("users");
      const found = data.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found) throw new Error("User not found");
      if (found.password !== password) throw new Error("Invalid password");
      setUser(found);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignup = async ({ email, password }) => {
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
        joinDate: new Date().toISOString().split("T")[0]
      };
      await apiPost("users", newUser);
      alert("Signup successful! You can now login.");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // BOOKINGS
  const addBooking = async (booking) => {
    try {
      await apiPost("bookings", booking);
      setBookings((prev) => [...prev, booking]);
      alert("Booking confirmed!");
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

  // VEHICLES CRUD
  const addOrUpdateVehicle = async (vehicle, editingId = null) => {
    try {
      if (editingId) {
        await apiPatch("vehicles", editingId, vehicle);
        setVehicles((v) => v.map((x) => (x.id === editingId ? { ...x, ...vehicle } : x)));
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading Estate Riders data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <NavBar user={user} onLogout={handleLogout} />
      <main className={user ? "pt-20" : "pt-8"}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} onSignup={handleSignup} />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} onSignup={handleSignup} />} />
          <Route path="/home" element={user ? <Home vehicles={vehicles} onBookingConfirmed={addBooking} /> : <Navigate to="/login" />} />
          <Route path="/catalog" element={<CatalogPage items={vehicles} onAddItem={addOrUpdateVehicle} />} />
          <Route path="/item/:id" element={<ItemDetails vehicles={vehicles} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin"
            element={
              user ? (
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
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
