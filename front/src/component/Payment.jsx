import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Log the received state
  console.log('Payment state:', location.state);

  // Destructure props with a fallback value
  const { busNo, requestedSeats = [], price } = location.state || {}; // Provide default values

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [email, setEmail] = useState(''); // Added state for email

  // Calculate total amount based on number of seats booked
  const amount = requestedSeats.length * price;

  const handlePayment = () => {
    const paymentData = {
      amount: amount,
      paymentMethod: paymentMethod,
      email: email, // Include email in the payment data
    };

    // Proceed to process the payment directly
    axios.post('http://localhost:8080/api/payments/process', paymentData)
      .then(response=> {
        if (response.data === "User not found. Please check the email address.") {
            alert(response.data); // Alert the user that they are not found
            return;
          }
        else{
            console.log('Payment successful:', response.data);
            alert('Payment successful! Processing your booking...');
    
        }

        // Automatically call the booking API after payment
        const bookingData = {
          busNo: busNo,
          email: email,
          requestedSeats: requestedSeats
        };

        axios.post('http://localhost:8080/api/bookings/book', bookingData)
          .then(response => {
            console.log('Booking successful:', response.data);
            navigate('/confirmation', { state: { bookingId: response.data.bookingId, busNo } });
          })
          .catch(error => {
            console.error('Error booking seats:', error);
            alert('Booking failed. Please try again.');
          });
      })
      .catch(error => {
        console.error('Error processing payment:', error);
        alert('Payment failed. Please try again.');
      });
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <div className="payment-details">
        <p>Bus Number: {busNo}</p>
        <p>Number of Seats: {requestedSeats.length}</p>
        <p>Amount: {amount} USD</p>

        {/* Email input field */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="payment-method">Payment Method:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="UPI">UPI</option>
        </select>

        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;
