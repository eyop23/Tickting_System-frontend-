import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../redux/userSlice';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    role: 'user', // Default role is user
    message: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password, role } = this.state;
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
        role,
      });

      if (response.data.token) {
        this.props.loginUser(response.data);
        this.props.history.push('/dashboard');
      }
    } catch (error) {
      this.setState({ message: 'Error during sign up' });
    }
  };

  render() {
    return (
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white p-8 rounded-md shadow-md w-96" onSubmit={this.handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Signup</h2>
          {this.state.message && <p className="text-red-500">{this.state.message}</p>}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Password"
          />
          <select
            name="role"
            value={this.state.role}
            onChange={this.handleChange}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Signup</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { loginUser };

export default connect(null, mapDispatchToProps)(Signup);
