import React from "react"; // Ensure React is imported
import ReactDOM from "react-dom/client"; // For React 18+
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventLandingPage from "./App.jsx";
import AdminPanel from "./components/Admin.jsx";
import "./index.css"; // Import styles if applicable

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<EventLandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
