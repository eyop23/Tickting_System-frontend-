import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

const CreateTicket = () => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const response = await axios.post(
        `${BASE_URL}/users/tickets`,
        {
          title: ticketTitle,
          description: ticketDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the Authorization header
          },
        }
      );

      alert("Ticket created successfully!");
      setTicketTitle("");
      setTicketDescription("");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            value={ticketTitle}
            onChange={(e) => setTicketTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
