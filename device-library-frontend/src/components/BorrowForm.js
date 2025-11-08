import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    axios.get('http://localhost:5000/api/devices')
      .then(res => setDevices(res.data.filter(d => d.status === 'available')))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Booking failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userName" className="form-control mb-2" placeholder="Your Name" onChange={handleChange} />
      <input name="userEmail" className="form-control mb-2" placeholder="Your Email" onChange={handleChange} />
      <select name="deviceId" className="form-control mb-2" onChange={handleChange}>
        <option>Select a device</option>
        {devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <input type="date" name="startDate" className="form-control mb-2" onChange={handleChange} />
      <input type="date" name="endDate" className="form-control mb-2" onChange={handleChange} />
      <button className="btn btn-primary">Submit</button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
}
