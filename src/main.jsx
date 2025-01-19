import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventLandingPage from "./App.jsx";


import "./index.css"; // Import your styles
import AdminLogin from "./components/Admin_login/Admin_login.jsx";
import Admin from "./components/Admin.jsx";
import PrivateRoute from "./components/Private_routes.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<EventLandingPage />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* Private Route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
