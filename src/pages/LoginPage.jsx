import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../slices/authSlice";
import BASE_URL from "../config";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, formData);
      const { token, user } = response.data;
      
      // Dispatch to Redux store
      dispatch(loginSuccess({ token, user }));

      // Redirect based on role
      navigate(user.role === "admin" ? "/admin/profile" : "/user/profile");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
      </div>
    </div>
  );
};

export default LoginPage;
