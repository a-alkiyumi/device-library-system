import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/devices')
      .then(res => setDevices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="row">
      {devices.map(device => (
        <div className="col-md-4 mb-3" key={device.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{device.name}</h5>
              <p>Type: {device.type}</p>
              <p>Status: <b>{device.status}</b></p>
              <p>Max days: {device.max_borrow_duration}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
