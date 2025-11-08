import React, { useState } from 'react';
import axios from 'axios';

export default function MyBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch bookings for the provided email
  const fetchBookings = async () => {
    if (!email) {
      setError('Please enter an email first.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5000/api/bookings?email=${encodeURIComponent(email)}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      setError('Failed to fetch bookings. Make sure the backend is running.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Cancel a booking by id - calls DELETE /api/bookings/:id
  const handleCancel = async (bookingId) => {
    const ok = window.confirm('Are you sure you want to cancel this booking?');
    if (!ok) return;

    setCancelingId(bookingId);
    setError(null);

    try {
      // Call backend delete route
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);

      alert('Booking cancelled successfully.');
      // ⬇️ Re-fetch bookings to refresh the list and device statuses
      fetchBookings();
    } catch (err) {
      console.error('Failed to cancel booking', err);
      setError('Failed to cancel booking. Try again.');
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="container mt-3">
      <h3>My Bookings</h3>

      {/* Email input + search button */}
      <div className="mb-3 d-flex gap-2">
        <input
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchBookings} disabled={loading}>
          {loading ? 'Searching…' : 'Show My Bookings'}
        </button>
      </div>

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* No bookings message */}
      {!loading && bookings.length === 0 && (
        <div className="text-muted">No bookings found.</div>
      )}

      {/* Booking list */}
      {bookings.map(b => (
        <div className="card mb-2" key={b.id}>
          <div className="card-body">
            <h5 className="card-title">{b.Device?.name ?? `Device #${b.device_id}`}</h5>

            <p className="mb-1">
              <strong>Borrowed:</strong>{' '}
              {b.start_date ? new Date(b.start_date).toLocaleDateString() : 'N/A'}
            </p>
            <p className="mb-1">
              <strong>Return:</strong>{' '}
              {b.end_date ? new Date(b.end_date).toLocaleDateString() : 'N/A'}
            </p>
            <p className="mb-2"><strong>Status:</strong> {b.status}</p>

            {/* Cancel button - only show if it's still booked */}
            {b.status === 'booked' && (
              <div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleCancel(b.id)}
                  disabled={cancelingId === b.id}
                >
                  {cancelingId === b.id ? 'Cancelling…' : 'Cancel Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
