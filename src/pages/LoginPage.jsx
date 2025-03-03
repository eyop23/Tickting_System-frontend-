// src/pages/LoginPage.jsx
import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import BASE_URL from "../config";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      successMessage: null,
      redirectTo: null, // Store redirection path after login
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      console.log(response.data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      this.setState({ successMessage: "Login successful!" });

      // Redirect based on role
      if (user.role === "admin") {
        this.setState({ redirectTo: "/admin/profile" });
      } else {
        this.setState({ redirectTo: "/user/profile" }); // Not implemented yet
      }
    } catch (error) {
      this.setState({ error: "Invalid credentials. Please try again." });
    }
  };

  render() {
    const { email, password, error, successMessage, redirectTo } = this.state;

    // Redirect if `redirectTo` is set
    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }

    return (
      <div className="max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border rounded-md"
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
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginPage;
