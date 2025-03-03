import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const UserSideBar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      {/* Sidebar Header with Close Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">User Panel</h2>
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
          to="/user/profile"
          className={`p-2 rounded-md ${
            location.pathname === "/user/profile"
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
        >
          Profile
        </Link>
        <Link
          to="/user/tickets"
          className={`p-2 rounded-md ${
            location.pathname === "/user/tickets"
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
        >
          My Tickets
        </Link>
        <Link
          to="/user/create-ticket"
          className={`p-2 rounded-md ${
            location.pathname === "/user/create-ticket"
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
        >
          Create Ticket
        </Link>
      </nav>
    </div>
  );
};

export default UserSideBar;
