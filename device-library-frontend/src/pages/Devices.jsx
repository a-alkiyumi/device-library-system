import { useEffect, useMemo, useState } from 'react';
import DeviceCard from '../components/DeviceCard';

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/devices')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load devices');
        return res.json();
      })
      .then(setDevices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(devices.map((d) => d.category))],
    [devices]
  );

  const filtered = devices.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || d.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="devices-page">
      <div className="devices-header">
        <h1>Devices</h1>
        <p>{filtered.length} of {devices.length} devices</p>
      </div>

      <div className="devices-controls">
        <input
          type="text"
          placeholder="Search devices..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="empty-state">Loading devices...</p>}
      {error && <p className="empty-state">Couldn't load devices: {error}</p>}

      {!loading && !error && (
        filtered.length > 0 ? (
          <div className="devices-grid">
            {filtered.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No devices match your search.</p>
        )
      )}
    </div>
  );
}

export default Devices;
