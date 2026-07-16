# Changelog

All notable changes to this project are documented here, newest first.

## 2026-07-16 — README update

### Changed
- Documented the return-token flow (features list, API table) and the `FRONTEND_URL` config var.

## 2026-07-16 — Return token

### Added
- Per-booking `returnToken`, generated when a device is booked and sent only in the confirmation email as a return link (`/bookings/:id/return?token=...`).
- `ReturnConfirm` page that completes a return when the emailed link is opened.

### Changed
- `GET /api/bookings` no longer includes `returnToken` in the response — email lookup is now view-only.
- `POST /api/bookings/:id/return` requires a matching `token`; rejects with 403 otherwise.
- "My Bookings" page's return button replaced with a pointer to the confirmation email, since it can no longer act without the token.

### Fixed
- Seed script was missing `returnToken` on its two demo bookings, which crashed the first server start after the schema change.
- React StrictMode double-invoked the return request in dev, making a successful return display as "already returned." Guarded with a ref so it only fires once.

### Security
- Closes a gap where anyone who knew or guessed a booking's email could view its history and mark it returned. Surfaced via a 5-advisor council review of the booking system's trust model; the fix was scoped down from a full OTP/auth rebuild to a lightweight per-booking token after a devil's-advocate pass argued the project's prior (abandoned) version had already failed once carrying that exact complexity.

## 2026-07-15 — Email notifications

### Added
- Nodemailer confirmation emails sent on booking and on return.
- Console-log fallback when `EMAIL_USER`/`EMAIL_PASS` aren't set, so the app works without email setup in dev.
- `.env.example` documenting the Gmail App Password setup.

## 2026-07-14 — Rebuild: UI, backend, and booking system

Both `device-library-frontend` and `device-library-backend` were found essentially empty — placeholder folders only — with their `node_modules` corrupted (installed packages missing their own `package.json` files, a OneDrive sync issue). The project's `.git` directory was broken the same way (no `HEAD`, no `config`, no recoverable commits) even though GitHub held 8 prior commits, including an earlier, different implementation (with a `User` auth model and a `nodemailer` dependency) from November 2025. Rebuilt from scratch this session and reconciled onto that real history.

### Added
- React frontend: Home page, Devices grid with search/category filtering, DeviceDetail page, "My Bookings" email lookup page.
- Express + Sequelize + SQLite backend: `Device` and `Booking` models, `/api/devices` and `/api/bookings` routes.
- Booking system: book a device with first/last name + email, fixed per-device loan period (`maxLoanDays`), device status flips between Available/Checked Out, return flow.
- Visual design pass: layered gradient background, glassy sticky navbar, gradient hero and buttons.
- `README.md` with setup instructions and API reference.

### Changed
- Reconciled the corrupted local repo onto the real GitHub history as a new commit (not a force-push) — the prior auth/nodemailer implementation is preserved in git history, just no longer the current state of the repo.
- Removed `node_modules`, `database.sqlite`, and `.env` from git tracking (committed by mistake in the prior version); properly gitignored going forward.

## 2025-11-08 to 2025-11-09 — Prior version (superseded)

Earlier implementation with its own `User` model (username/password) and a `nodemailer` dependency, built before this session (`b3cfefc`…`d0827c6`). Preserved in git history but replaced entirely by the 2026-07-14 rebuild above.
