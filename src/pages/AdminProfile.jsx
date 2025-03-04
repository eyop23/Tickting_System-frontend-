import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config"; // Replace with your actual BASE_URL if needed

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Admin Profile</h2>
      <div className="mb-4">
        <label className="text-lg font-semibold">Name:</label>
        <p className="text-gray-700">{user.name}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-semibold">Email:</label>
        <p className="text-gray-700">{user.email}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-semibold">Role:</label>
        <p className="text-gray-700 capitalize">{user.role}</p>
      </div>
      {/* <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Edit Profile
        </button>
      </div> */}
    </div>
  );
};

export default AdminProfile;
