import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://event-planner-server.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // Save the token to localStorage
          localStorage.setItem("token", data.token);

          // Display success message
          Swal.fire({
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Redirect to Admin Panel
          navigate("/admin");
        } else {
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Invalid email or password. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
