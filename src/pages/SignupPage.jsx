// src/pages/SignupPage.jsx

import React, { Component } from "react";
import axios from "axios"; // Import axios to handle API requests
import BASE_URL from "../config"; // Import the BASE_URL from config

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: null,
      successMessage: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    try {
      // Send a POST request to the backend for registration
      const response = await axios.post(`${BASE_URL}/users/signup`, {
        name,
        email,
        password,
      });
      // On success, display a success message
      this.setState({ successMessage: "Registration successful!" });
    } catch (error) {
      // On error, display the error message
      this.setState({ error: "Something went wrong. Please try again." });
    }
  };

  render() {
    const { name, email, password, error, successMessage } = this.state;
    return (
      <div className="max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        {/* Display success or error message */}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

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
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default SignupPage;
