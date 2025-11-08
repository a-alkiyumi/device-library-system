import React, { useEffect, useState } from "react";
import axios from "axios";

// DeviceList component fetches and displays a list of devices
const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // Make GET request to backend API to get devices
        const response = await axios.get("http://localhost:5000/api/devices");
        // Store the fetched devices in state
        setDevices(response.data);
      } catch (error) {
        // Log error if API request fails
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices(); // Call the async function
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading devices...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Device Library
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* Device image */}
            <img
              src={device.image} 
              alt={device.name}  
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              {/* Device name */}
              <h2 className="text-xl font-semibold text-gray-900">
                {device.name}
              </h2>

              {/* Device type */}
              <p className="text-gray-600 text-sm">{device.type}</p>

              {/* Device status badge */}
              <p
                className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${
                  device.status === "available"
                    ? "bg-green-100 text-green-700" // Green badge if available
                    : "bg-red-100 text-red-700"     // Red badge if not available
                }`}
              >
                {device.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
