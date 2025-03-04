import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
      });
      console.log(response.data);
      setCustomers(response.data.user); // Assuming the response is in the "user" array
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer Number</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            {/* <th className="border p-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.role}</td>
              {/* <td className="border p-2">
                <button className="bg-gray-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
