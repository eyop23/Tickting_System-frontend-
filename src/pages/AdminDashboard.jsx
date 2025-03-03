import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import AdminProfile from "./AdminProfile";
import AdminTickets from "./AdminTickets";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Toggle Sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Logout Function
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Button to open sidebar */}
        <button
          onClick={toggleSidebar}
          className="text-2xl mb-4 focus:outline-none"
        >
          <FiMenu />
        </button>

        {/* Logout Button - Positioned at the top-right corner */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded mb-4"
        >
          Logout
        </button>

        {/* Page Routes */}
        <Routes>
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/tickets" element={<AdminTickets />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
