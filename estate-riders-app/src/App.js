import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import HireForm from "./components/HireForm";

function App() {
  return (
    <div>
      <NavBar />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ItemDetails />} />
          <Route path="/hire" element={<HireForm />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
