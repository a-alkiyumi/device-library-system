import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

function ReturnConfirm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('This return link is missing its token.');
      return;
    }
    if (requested.current) return;
    requested.current = true;

    fetch(`/api/bookings/${id}/return`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not return this device');
        setBooking(data);
        setStatus('done');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  return (
    <div className="device-detail">
      <Link to="/bookings" className="back-link">
        ← My Bookings
      </Link>

      <div className="device-detail-card">
        {status === 'loading' && <p className="empty-state">Returning your device...</p>}

        {status === 'done' && (
          <div className="booking-confirmation">
            <p>
              <strong>{booking.Device?.name}</strong> has been returned. It's now available for the next
              person to book.
            </p>
          </div>
        )}

        {status === 'error' && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
}

export default ReturnConfirm;
