import React, { useEffect, useState } from "react";
import axios from "axios";

// Home component displays a list of all devices with details
const Home = () => {
  const [devices, setDevices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // Make GET request to backend API to get all devices
        const response = await axios.get("http://localhost:5000/api/devices");
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices(); 
  }, []); 

  // Show loading message while data is being fetched
  if (loading) {
    return <p className="text-center mt-5">Loading devices...</p>;
  }

  return (
    <div>
      {/* Page heading */}
      <h2 className="text-center mb-4">Available Devices</h2>

      {/* Bootstrap row for device cards */}
      <div className="row">
        {devices.map((device) => (
          <div key={device.id} className="col-md-4 mb-4">
            {/* Device card */}
            <div className="card shadow-sm h-100">
              {/* Device image */}
              <img
                src={device.image}         
                alt={device.name}          
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              
              <div className="card-body">
                {/* Device name */}
                <h5 className="card-title">{device.name}</h5>
                
                {/* Device type */}
                <p className="card-text text-muted mb-1">
                  Type: {device.type}
                </p>

                {/* Maximum borrow duration */}
                <p className="card-text mb-2">
                  <strong>Max Duration:</strong> {device.max_borrow_duration}{" "}
                  days
                </p>

                {/* Device status badge */}
                <span
                  className={`badge ${
                    device.status === "available"
                      ? "bg-success" // Green badge if available
                      : "bg-danger"  // Red badge if not available
                  }`}
                >
                  {device.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
