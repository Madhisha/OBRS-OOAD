import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Bus.css';  // Custom styles

const Bus = () => {
  const [buses, setBuses] = useState([]);  // Store the buses from MongoDB
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the bus data from the backend
    axios.post('/api/buses')
      .then((response) => {
        setBuses(response.data);  // Set the buses data into state
      })
      .catch((error) => {
        console.error('Error fetching bus schedules:', error);
      });
  }, []);

  // Handler for reserving a seat
  const handleReserve = (busId) => {
    alert(`Reserved seat for bus ID: ${busId}`);
  };

  return (
    <div className="schedule-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>Bus Schedules</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Bus No</th>
            <th>Total Seats</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>From</th>
            <th>To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.busId}>
              <td>{bus.busType}</td>
              <td>{bus.busNo}</td>
              <td>{bus.totalSeats}</td>
              <td>{bus.availableSeats.join(', ')}</td>
              <td>{bus.price}</td>
              <td>{bus.departureTime}</td>
              <td>{bus.arrivalTime}</td>
              <td>{bus.departureCity}</td>
              <td>{bus.destinationCity}</td>
              <td>
                <button onClick={() => handleReserve(bus.busId)}>Reserve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bus;
