# Device Library

A simple device lending catalog. Browse available devices, see how long each one can be borrowed, book one with just your name and email, and manage your bookings — no account required.

## Features

- **Browse devices** — grid of devices with icons, categories, descriptions, and live availability status
- **Device details** — full description, loan period, and (when checked out) the expected return date
- **Book instantly** — reserve a device with first name, last name, and email
- **My Bookings** — look up your bookings by email and return a device when you're done

## Tech Stack

- **Frontend**: React (Create React App), React Router
- **Backend**: Express, Sequelize, SQLite

## Project Structure

```
device-library-system/
├── device-library-frontend/   # React app
│   └── src/
│       ├── components/        # Navbar, DeviceCard
│       └── pages/             # Home, Devices, DeviceDetail, Bookings
└── device-library-backend/    # Express API
    ├── models/                # Device, Booking (Sequelize)
    ├── routes/                # /api/devices, /api/bookings
    └── seeders/                # Demo seed data
```

## Getting Started

### Backend

```bash
cd device-library-backend
npm install
npm start
```

Runs on `http://localhost:5000`. On first run it creates a local SQLite database (`database.sqlite`) and seeds it with sample devices and bookings.

### Frontend

```bash
cd device-library-frontend
npm install
npm start
```

Runs on `http://localhost:3000` and proxies API requests to the backend on port 5000.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/devices` | List all devices |
| GET | `/api/devices/:id` | Get a single device (includes expected return date if checked out) |
| POST | `/api/devices/:id/book` | Book a device — body: `{ email, firstName, lastName }` |
| GET | `/api/bookings?email=` | List bookings for an email |
| POST | `/api/bookings/:id/return` | Return a booked device |
