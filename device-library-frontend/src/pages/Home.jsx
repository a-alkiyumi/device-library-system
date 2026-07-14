import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🗂️',
    title: 'Browse the Catalog',
    text: 'See every device in the library at a glance, from laptops to cameras to VR headsets.',
  },
  {
    icon: '📝',
    title: 'Clear Descriptions',
    text: 'Each device has specs and details written in plain language, so you know what you\'re getting.',
  },
  {
    icon: '✅',
    title: 'Book in Seconds',
    text: 'See what\'s available and how long you can keep it, then book with just your name and email — no account needed.',
  },
];

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Find and borrow the right device, fast.</h1>
        <p>
          Device Library is a simple catalog for everything your team can check out —
          laptops, tablets, cameras, and more. Browse descriptions, check availability,
          and know exactly what's on the shelf before you go looking for it.
        </p>
        <Link to="/devices" className="cta-button">
          Browse Devices
        </Link>
      </section>

      <section className="features">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <span className="feature-icon" aria-hidden="true">
              {f.icon}
            </span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
