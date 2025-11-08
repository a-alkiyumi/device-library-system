import React, { useState, useEffect } from 'react';
import axios from 'axios';

// BorrowForm component allows users to book a device
export default function BorrowForm() {
  const [devices, setDevices] = useState([]);
  const [form, setForm] = useState({
    userEmail: '',  
    userName: '',    
    deviceId: '',    
    startDate: '',   
    endDate: ''      
  });

  
  const [message, setMessage] = useState('');

  // Fetch available devices from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/devices')
      .then(res => 
        // Filter devices to show only those with status 'available'
        setDevices(res.data.filter(d => d.status === 'available'))
      )
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault(); 
    try {
      // Send POST request to create a new booking
      const res = await axios.post('http://localhost:5000/api/bookings', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Booking failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for user's name */}
      <input 
        name="userName" 
        className="form-control mb-2" 
        placeholder="Your Name" 
        onChange={handleChange} 
      />

      {/* Input for user's email */}
      <input 
        name="userEmail" 
        className="form-control mb-2" 
        placeholder="Your Email" 
        onChange={handleChange} 
      />

      {/* Dropdown to select available device */}
      <select 
        name="deviceId" 
        className="form-control mb-2" 
        onChange={handleChange}
      >
        <option>Select a device</option>
        {devices.map(d => 
          <option key={d.id} value={d.id}>{d.name}</option>
        )}
      </select>

      {/* Input for booking start date */}
      <input 
        type="date" 
        name="startDate" 
        className="form-control mb-2" 
        onChange={handleChange} 
      />

      {/* Input for booking end date */}
      <input 
        type="date" 
        name="endDate" 
        className="form-control mb-2" 
        onChange={handleChange} 
      />

      {/* Submit button */}
      <button className="btn btn-primary">Submit</button>

      {/* Display success or error message */}
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
}
