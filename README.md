# Device Library

A simple device lending catalog. Browse available devices, see how long each one can be borrowed, book one with just your name and email, and manage your bookings — no account required.

## Features

- **Browse devices** — grid of devices with icons, categories, descriptions, and live availability status
- **Device details** — full description, loan period, and (when checked out) the expected return date
- **Book instantly** — reserve a device with first name, last name, and email
- **My Bookings** — look up your booking history by email
- **Return by link** — return a device using the one-time link sent in your booking confirmation email (email lookup alone can't return a device for someone else)
- **Email notifications** — confirmation emails on booking and on return

## Tech Stack

- **Frontend**: React (Create React App), React Router
- **Backend**: Express, Sequelize, SQLite, Nodemailer

## Project Structure

```
device-library-system/
├── device-library-frontend/   # React app
│   └── src/
│       ├── components/        # Navbar, DeviceCard
│       └── pages/             # Home, Devices, DeviceDetail, Bookings, ReturnConfirm
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

#### Email notifications (optional)

Copy `.env.example` to `.env` and fill in `EMAIL_USER`/`EMAIL_PASS` with a Gmail address and an [App Password](https://myaccount.google.com/apppasswords) (not your regular password) to have booking/return confirmations actually emailed out. If left unset, the backend logs what it would have sent to the console instead — no setup required for local development.

`FRONTEND_URL` (defaults to `http://localhost:3000`) is used to build the return link in the booking confirmation email, whether or not real email sending is configured.

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
| POST | `/api/devices/:id/book` | Book a device — body: `{ email, firstName, lastName }`. Response includes a `returnToken` for immediate return. |
| GET | `/api/bookings?email=` | List bookings for an email (view-only — does not include the return token) |
| POST | `/api/bookings/:id/return` | Return a booked device — body: `{ token }`, must match the booking's `returnToken` |
