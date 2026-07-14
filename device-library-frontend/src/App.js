import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Devices from './pages/Devices';
import DeviceDetail from './pages/DeviceDetail';
import Bookings from './pages/Bookings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
