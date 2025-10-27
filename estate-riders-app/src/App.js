import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPatch, apiDelete } from "./api.js";

import Login from "./pages/LogIn.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CatalogPage from "./pages/Catalog.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import AdminDashboard from "./pages/Admin.jsx";
import NavBar from "./components/NavBar.jsx";
import { Zap } from "lucide-react";

function App() {
  const navigate = useNavigate();

  // 🔹 Global App State
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const bookingLock = useRef(false);
  const [toast, setToast] = useState(null);

  // =====================================================
  // INITIAL LOAD (Fetch users, vehicles, bookings)
  // =====================================================
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
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // =====================================================
  // RESTORE USER SESSION
  // =====================================================
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // =====================================================
  // TOAST MESSAGE HELPER
  // =====================================================
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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

      if (found.role === "admin") navigate("/admin");
      else navigate("/home");
    } catch (err) {
      showToast(err.message, "error");
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
        role,
      };

      await apiPost("users", newUser);
      showToast("Signup successful! You can now log in.");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // =====================================================
  // BOOKINGS - SINGLE BOOKING ONLY
  // =====================================================
  const addBooking = async (booking) => {
    // CRITICAL: Prevent any concurrent booking attempts
    if (bookingLock.current) {
      console.log(" Booking in progress, ignoring duplicate request");
      return;
    }

    // Lock immediately before any async operations
    bookingLock.current = true;

    try {
      // STEP 1: Fetch fresh bookings data from server
      const freshBookings = await apiGet("bookings");
      
      // STEP 2: Check for duplicates in fresh data
      const duplicateExists = freshBookings.some(
        (b) =>
          String(b.userId) === String(booking.userId) &&
          String(b.vehicleId) === String(booking.vehicleId) &&
          b.date === booking.date
      );

      if (duplicateExists) {
        showToast("You already booked this item for this date.", "error");
        return;
      }

      // STEP 3: Check for any active booking for same vehicle
      const activeBookingExists = freshBookings.some(
        (b) =>
          String(b.userId) === String(booking.userId) &&
          String(b.vehicleId) === String(booking.vehicleId) &&
          b.status !== "cancelled" &&
          b.status !== "completed"
      );

      if (activeBookingExists) {
        showToast("You already have an active booking for this vehicle.", "error");
        return;
      }

      // STEP 4: Create the booking (single API call)
      const savedBooking = await apiPost("bookings", booking);
      
      // STEP 5: Update local state with the saved booking
      setBookings((prev) => [...prev, savedBooking]);

      // STEP 6: Show success message
      showToast("Booking confirmed successfully!");

    } catch (err) {
      console.error("Booking error:", err);
      showToast("Booking failed. Please try again.", "error");
    } finally {
      // STEP 7: Release lock after 2 seconds
      setTimeout(() => {
        bookingLock.current = false;
      }, 2000);
    }
  };

  // =====================================================
  // CANCEL BOOKING
  // =====================================================
  const cancelBooking = async (id) => {
    try {
      await apiDelete("bookings", id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      showToast("Booking cancelled.");
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      showToast("Failed to cancel booking.", "error");
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
      showToast("Vehicle saved successfully!");
    } catch (err) {
      showToast("Vehicle save failed: " + err.message, "error");
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await apiDelete("vehicles", id);
      setVehicles((v) => v.filter((x) => x.id !== id));
      showToast("Vehicle deleted.");
    } catch (err) {
      showToast("Delete failed: " + err.message, "error");
    }
  };

  // =====================================================
  // LOADING SCREEN WITH ANIMATION
  // =====================================================
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-2xl shadow-2xl animate-bounce">
            <Zap size={48} className="text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">
          Estate Riders
        </h2>
        <p className="text-gray-600 mb-8">Loading your eco-friendly rides...</p>

        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-8">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ROUTES
  // =====================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative">
      <NavBar user={user} onLogout={handleLogout} />

      {/* Toast Notification */}
      {toast && (
        <div
          style={{ top: '100px' }}
          className={`fixed right-8 px-6 py-4 rounded-lg shadow-xl text-white font-medium transition-all duration-500 z-[9999] ${
            toast.type === "error"
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <main className={user ? "pt-20" : "pt-8"}>
        <Routes>
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

          <Route
            path="/home"
            element={
              user ? (
                <Home 
                  vehicles={vehicles} 
                  onBookingConfirmed={addBooking}
                  currentUser={user}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/catalog"
            element={<CatalogPage items={vehicles} onAddItem={addOrUpdateVehicle} />}
          />

          <Route
            path="/item/:id"
            element={
              <ItemDetails 
                vehicles={vehicles}
                onBookNow={addBooking}
                currentUser={user}
              />
            }
          />

          <Route path="/about" element={<About />} />

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
                    setBookings((prev) =>
                      prev.map((x) => (x.id === b.id ? b : x))
                    )
                  }
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

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