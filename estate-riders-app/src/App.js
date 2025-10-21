import React, { useState } from "react";
import NavBar from "./components/NavBar";
import About from './pages/About';

function App() {
  const [route, setRoute] = useState("home");

  return (
    <div>
      <NavBar
        currentRoute={route}
        navigate={setRoute}
        user={{ username: "Simon" }}
        onLogout={() => alert("Logged out")}
      />

      <main className="p-4">
        {route === "home" && <p>🏠 Welcome to Estate Riders!</p>}
        {route === "about" && <About />}
        {route === "add" && <p>➕ Add a new item.</p>}
        {route === "hire" && <p>🛵 Hire a bike or scooter.</p>}
        {route === "rentals" && <p>📦 View your rentals.</p>}
      </main>
    </div>
  );
}

export default App;
