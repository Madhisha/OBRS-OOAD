import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './CSS/Find.css';

const Find = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [requestedSeats, setRequestedSeats] = useState([]);
  const [userEmail, setUserEmail] = useState(''); // Keep this for validation, but don't show it in the UI
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/buses')
      .then(response => {
        setBuses(response.data);
        setFilteredBuses(response.data);
      })
      .catch(error => {
        console.error('Error fetching buses:', error);
      });
  }, []);

  useEffect(() => {
    filterBuses();
  }, [from, to, date]);

  const filterBuses = () => {
    const dateString = date.toISOString().split('T')[0];
    const foundBuses = buses.filter(bus =>
      bus.departureCity.toLowerCase().includes(from.toLowerCase()) &&
      bus.destinationCity.toLowerCase().includes(to.toLowerCase()) &&
      bus.departureTime.startsWith(dateString)
    );
    setFilteredBuses(foundBuses);
  };

  const handleBusSelection = (bus) => {
    setSelectedBus(bus);
    setRequestedSeats([]);
  };

  const handleSeatSelection = (seatNumber) => {
    setRequestedSeats(prevSeats =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter(seat => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const handleProceedToPayment = () => {
    // Check if the user has entered their email

    // Check if at least one seat is selected
    if (requestedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const busNo = selectedBus.busNo;
    const price = selectedBus.price;  // Assuming the bus object contains a price field

    // Navigate to payment page with booking details
    navigate('/payment', {
      state: {
        busNo: busNo,
        requestedSeats: requestedSeats,
        price: price  // Pass the bus price to the Payment page
      }
    });
  };

  return (
    <div className="full">
      <button className="log-button" onClick={() => navigate('/login')}>Login</button>
      <button className="reg-button" onClick={() => navigate('/register')}>Register</button>
      <div className="main">
        <h1>Find Schedule</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="user">
            <div className="input">
              <label>From:</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Departure City"
              />
            </div>
            <div className="input">
              <label>To:</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination City"
              />
            </div>
            <div className="input">
              <label>Date:</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </form>

        {filteredBuses.length > 0 && (
          <div className="bus-grid">
            {filteredBuses.map(bus => (
              <div key={bus.busNo} className="bus-card" onClick={() => handleBusSelection(bus)}>
                <h3>{bus.busNo}</h3>
                <p>Departure City: {bus.departureCity}</p>
                <p>Destination City: {bus.destinationCity}</p>
                <p>Departure Time: {bus.departureTime}</p>
                <p>Available Seats: {bus.availableSeats}</p>
                <p>Price per seat: {bus.price} USD</p>
              </div>
            ))}
          </div>
        )}

        {selectedBus && (
          <div className="bus-details">
            <h2>Bus Details</h2>
            <p>Bus No: {selectedBus.busNo}</p>
            <p>Departure City: {selectedBus.departureCity}</p>
            <p>Destination City: {selectedBus.destinationCity}</p>
            <p>Departure Time: {selectedBus.departureTime}</p>
            <p>Available Seats: {selectedBus.availableSeats}</p>
            <div>
              {/* Remove the email input field */}
              <div>
                <label>Select Seats:</label>
                <div className="seat-selection">
                  {Array.isArray(selectedBus.availableSeats)
                    ? selectedBus.availableSeats.map((seatNumber) => (
                        <div
                          key={seatNumber}
                          className={`seat ${requestedSeats.includes(seatNumber) ? 'selected' : ''}`}
                          onClick={() => handleSeatSelection(seatNumber)}
                        >
                          Seat {seatNumber}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <button onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Find;
