import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setTickets, addTicket } from "../redux/actions";
import TicketForm from "./TicketForm";

class Dashboard extends Component {
  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
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

  handleTicketCreated = (ticket) => {
    this.props.addTicket(ticket);
  };

  render() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <TicketForm onTicketCreated={this.handleTicketCreated} />
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Your Tickets</h3>
          <ul className="mt-4 space-y-4">
            {this.props.tickets.map((ticket) => (
              <li key={ticket._id} className="p-4 border rounded-md">
                <h4 className="font-semibold">{ticket.title}</h4>
                <p>{ticket.description}</p>
                <p className="text-sm text-gray-600">Status: {ticket.status}</p>
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
  addTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
