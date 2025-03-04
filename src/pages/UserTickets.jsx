import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; // Import date-fns
import BASE_URL from "../config";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get(`${BASE_URL}/users/own_tickets`, {
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Ticket Number</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Created At</th>{" "}
            {/* New column for createdAt */}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id} className="border">
              {/* Incremental ticketNumber starts from 1 */}
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{ticket.title}</td>
              <td className="border p-2">{ticket.status}</td>
              <td className="border p-2">{ticket.description}</td>
              {/* Format the createdAt date */}
              <td className="border p-2">
                {ticket.createdAt
                  ? format(new Date(ticket.createdAt), "MMMM dd, yyyy HH:mm:ss")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
