import React, { Component } from 'react';
import axios from 'axios';

class TicketForm extends Component {
  state = {
    title: '',
    description: '',
    error: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    const { token } = this.props;

    if (!title || !description) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/tickets',
        { title, description, status: 'Open' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.props.onTicketCreated(response.data);
      this.setState({ title: '', description: '', error: '' });
    } catch (error) {
      this.setState({ error: 'Failed to create ticket' });
    }
  };

  render() {
    const { title, description, error } = this.state;

    return (
      <div className="mt-6">
        {error && <p className="text-red-600">{error}</p>}
        <h3 className="text-xl font-semibold">Create a New Ticket</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="mt-4">
            <label className="block text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 p-2 bg-blue-500 text-white rounded-md w-full"
          >
            Create Ticket
          </button>
        </form>
      </div>
    );
  }
}

export default TicketForm;
