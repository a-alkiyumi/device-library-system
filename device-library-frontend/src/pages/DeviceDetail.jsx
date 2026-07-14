import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function statusClass(status) {
  return status === 'Available' ? 'status status-available' : 'status status-checked-out';
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const emptyForm = { firstName: '', lastName: '', email: '' };

function DeviceDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const loadDevice = () => {
    setLoading(true);
    fetch(`/api/devices/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Device not found');
        return res.json();
      })
      .then((data) => {
        setDevice(data);
        setLoadError(null);
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadDevice, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch(`/api/devices/${id}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not complete booking');
      setConfirmation(data);
      setForm(emptyForm);
      loadDevice();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="empty-state">Loading device...</p>;
  if (loadError) return <p className="empty-state">{loadError}</p>;

  return (
    <div className="device-detail">
      <Link to="/devices" className="back-link">
        ← Back to Devices
      </Link>

      <div className="device-detail-card">
        <div className="device-detail-header">
          <span className="device-icon-large" aria-hidden="true">
            {device.icon}
          </span>
          <div className="device-detail-heading">
            <h1>{device.name}</h1>
            <span className="device-category">{device.category}</span>
          </div>
          <span className={statusClass(device.status)}>{device.status}</span>
        </div>

        <p className="device-description">{device.description}</p>

        <div className="device-meta">
          <div>
            <strong>Loan period</strong>
            <span>Up to {device.maxLoanDays} days per booking</span>
          </div>
          {device.status === 'Checked Out' && device.availableFrom && (
            <div>
              <strong>Expected back</strong>
              <span>{formatDate(device.availableFrom)}</span>
            </div>
          )}
        </div>

        {confirmation ? (
          <div className="booking-confirmation">
            <p>
              You're booked! <strong>{device.name}</strong> is reserved for {confirmation.firstName}, due back{' '}
              {formatDate(confirmation.dueDate)}.
            </p>
            <Link to={`/bookings?email=${encodeURIComponent(confirmation.email)}`}>
              View my bookings →
            </Link>
          </div>
        ) : device.status === 'Available' ? (
          <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Book this device</h2>
            <div className="form-row">
              <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            {formError && <p className="form-error">{formError}</p>}
            <button type="submit" className="cta-button" disabled={submitting}>
              {submitting ? 'Booking...' : 'Book Device'}
            </button>
          </form>
        ) : (
          <p className="unavailable-note">
            This device is currently checked out. Check back after the expected return date.
          </p>
        )}
      </div>
    </div>
  );
}

export default DeviceDetail;
