import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateTicketStatus } from "../redux/actions";

class AdminDashboard extends Component {
  componentDidMount() {
    this.fetchAllTickets();
  }

  fetchAllTickets = async () => {
    try {
      const { token } = this.props;
      const response = await axios.get("http://localhost:5000/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.props.setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  handleStatusChange = async (ticketId, status) => {
    try {
      const { token } = this.props;
      await axios.put(
        `http://localhost:5000/tickets/${ticketId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.props.updateTicketStatus({ id: ticketId, status });
    } catch (error) {
      console.error("Error updating ticket status", error);
    }
  };

  render() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="mt-8">
          <h3 className="text-xl font-semibold">All Tickets</h3>
          <ul className="mt-4 space-y-4">
            {this.props.tickets.map((ticket) => (
              <li key={ticket._id} className="p-4 border rounded-md">
                <h4 className="font-semibold">{ticket.title}</h4>
                <p>{ticket.description}</p>
                <p className="text-sm text-gray-600">Status: {ticket.status}</p>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    this.handleStatusChange(ticket._id, e.target.value)
                  }
                  className="mt-2 p-2 border rounded-md"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  tickets: state.tickets.tickets,
});

const mapDispatchToProps = {
  setTickets,
  updateTicketStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
