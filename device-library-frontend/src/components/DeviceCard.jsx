import { Link } from 'react-router-dom';

function statusClass(status) {
  return status === 'Available' ? 'status status-available' : 'status status-checked-out';
}

function DeviceCard({ device }) {
  return (
    <Link to={`/devices/${device.id}`} className="device-card">
      <div className="device-card-top">
        <span className="device-icon" aria-hidden="true">
          {device.icon}
        </span>
        <span className={statusClass(device.status)}>{device.status}</span>
      </div>
      <h3 className="device-name">{device.name}</h3>
      <span className="device-category">{device.category}</span>
      <p className="device-description">{device.description}</p>
      <p className="device-loan">
        Up to {device.maxLoanDays} day{device.maxLoanDays === 1 ? '' : 's'} per booking
      </p>
    </Link>
  );
}

export default DeviceCard;
