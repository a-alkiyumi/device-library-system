import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function Bookings() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [returningId, setReturningId] = useState(null);

  const lookup = async (targetEmail) => {
    const emailToUse = targetEmail || email;
    if (!emailToUse) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings?email=${encodeURIComponent(emailToUse)}`);
      if (!res.ok) throw new Error('Could not load bookings');
      setBookings(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const prefilled = searchParams.get('email');
    if (prefilled) lookup(prefilled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    lookup();
  };

  const handleReturn = async (bookingId) => {
    setReturningId(bookingId);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/return`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not return device');
      await lookup();
    } catch (err) {
      setError(err.message);
    } finally {
      setReturningId(null);
    }
  };

  return (
    <div className="bookings-page">
      <div className="devices-header">
        <h1>My Bookings</h1>
        <p>Look up your bookings by email</p>
      </div>

      <form className="lookup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? 'Looking up...' : 'Find My Bookings'}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {bookings && (
        bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div className="booking-row" key={b.id}>
                <span className="device-icon" aria-hidden="true">
                  {b.Device?.icon}
                </span>
                <div className="booking-info">
                  <h3>{b.Device?.name}</h3>
                  <p>
                    Booked {formatDate(b.bookedAt)} · Due {formatDate(b.dueDate)}
                  </p>
                </div>
                {b.returnedAt ? (
                  <span className="status status-available">Returned</span>
                ) : (
                  <button
                    className="return-button"
                    onClick={() => handleReturn(b.id)}
                    disabled={returningId === b.id}
                  >
                    {returningId === b.id ? 'Returning...' : 'Return Device'}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No bookings found for that email.</p>
        )
      )}
    </div>
  );
}

export default Bookings;
