import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';          // Home page component showing all devices
import Borrow from './pages/Borrow';      // Borrow page component for booking devices
import MyDevices from './pages/MyDevices';// MyDevices page showing user's booked devices
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

function App() {
  return (
    // Router wraps the entire app to enable routing between pages
    <Router>
      
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Device Library</Link>
        
        {/* Navigation links */}
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>         {/* Link to Home page */}
          <Link className="nav-link" to="/borrow">Borrow</Link> {/* Link to Borrow page */}
          <Link className="nav-link" to="/mydevices">My Devices</Link> {/* Link to My Devices page */}
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />             {/* Home page route */}
          <Route path="/borrow" element={<Borrow />} />     {/* Borrow page route */}
          <Route path="/mydevices" element={<MyDevices />} /> {/* My Devices page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
