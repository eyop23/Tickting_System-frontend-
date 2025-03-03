import React, { Component } from "react";

class TicketList extends Component {
  render() {
    const { tickets } = this.props;

    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Tickets</h3>
        <ul className="mt-4 space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="p-4 border rounded-md">
              <h4 className="font-semibold">{ticket.title}</h4>
              <p>{ticket.description}</p>
              <p className="text-sm text-gray-600">Status: {ticket.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TicketList;
