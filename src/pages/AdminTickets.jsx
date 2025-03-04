import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; // Import date-fns
import BASE_URL from "../config";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // To track the selected status for editing
  const [editingTicketId, setEditingTicketId] = useState(null); // To track the ticket being edited

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const response = await axios.get(`${BASE_URL}/admin/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });

      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const statusColors = {
    Open: "bg-blue-500", // Open status color
    "In Progress": "bg-yellow-500", // In Progress status color
    Closed: "bg-green-500", // Closed status color
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    console.log(ticketId);
    console.log(newStatus);
    try {
      const token = localStorage.getItem("token"); // Include token in the update request

      await axios.put(
        `${BASE_URL}/admin/tickets/${ticketId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state with the new ticket status
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      // Reset editing state
      setEditingTicketId(null);
      setSelectedStatus(null);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tickets</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Ticket Number</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>{" "}
            {/* New column for createdAt */}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id} className="border">
              <td className="border p-2">{index + 1}</td>{" "}
              {/* Incremental ticket number */}
              <td className="border p-2">{ticket.user.name}</td>
              <td className="border p-2">{ticket.title}</td>
              <td className="border p-2">{ticket.description}</td>
              <td className="border p-2">
                <span
                  className={`text-white py-1 px-2 rounded ${
                    statusColors[ticket.status]
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              {/* Format the createdAt date */}
              <td className="border p-2">
                {ticket.createdAt
                  ? format(new Date(ticket.createdAt), "MMMM dd, yyyy HH:mm:ss")
                  : "N/A"}
              </td>
              <td className="border p-2">
                {editingTicketId === ticket._id ? (
                  <div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <button
                      onClick={() =>
                        updateTicketStatus(ticket._id, selectedStatus)
                      }
                      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTicketId(ticket._id);
                      setSelectedStatus(ticket.status);
                    }}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Edit Status
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTickets;
