import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      {/* Sidebar Header with Close Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none"
        >
          <FiX />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col p-4 space-y-4">
        <Link
          to="/admin/profile"
          className={`p-2 rounded-md ${
            location.pathname === "/admin/profile"
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
        >
          Profile
        </Link>
        <Link
          to="/admin/tickets"
          className={`p-2 rounded-md ${
            location.pathname === "/admin/tickets"
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
        >
          Tickets
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
