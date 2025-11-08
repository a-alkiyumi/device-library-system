📚 Device Library System

A full-stack web application that allows users to browse, borrow, and manage devices such as laptops, tablets, and smartphones.
Built with React, Node.js, Express, and SQLite (Sequelize ORM).

🚀 Features

✅ Browse available devices with images and details
✅ Borrow devices for a limited duration
✅ View your active and past borrowings
✅ Automatically updates device status (available / borrowed)
✅ Simple backend API for managing devices and bookings
✅ Organized project structure (frontend + backend)

🧩 Tech Stack
Layer	Technology
Frontend	React, Bootstrap
Backend	Node.js, Express
Database	SQLite (via Sequelize ORM)
Version Control	Git + GitHub
🗂️ Project Structure
device-library-system/
│
├── device-library-backend/       # Backend (Express + Sequelize)
│   ├── models/                   # Sequelize models (Device, Booking)
│   ├── routes/                   # Express routes
│   ├── seeders/                  # Demo data for devices
│   ├── public/images/            # Device images
│   ├── database.sqlite           # SQLite database file
│   └── server.js                 # Main backend entry
│
├── device-library-frontend/      # Frontend (React)
│   ├── src/components/           # Reusable components
│   ├── src/pages/                # Page views (Home, Borrow, MyDevices)
│   ├── src/App.js                # Main React Router setup
│   └── package.json
│
└── package-lock.json

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/a-alkiyumi/device-library-system.git
cd device-library-system

2️⃣ Setup the Backend
cd device-library-backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start


Backend will run on http://localhost:5000

3️⃣ Setup the Frontend
cd ../device-library-frontend
npm install
npm start


Frontend will run on http://localhost:3000

💻 Default Devices (Seed Data)
Device	Type	Max Borrow Duration	Image
MacBook Pro M3	Laptop	7 days	🖥️
Dell XPS 15	Laptop	7 days	💻
HP Spectre X360	Laptop	7 days	💻
iPhone 15 Pro	Smartphone	5 days	📱
Galaxy S24 Ultra	Smartphone	5 days	📱
iPad Air	Tablet	10 days	💊
🧠 Future Improvements

Add authentication (login/signup)

Add admin dashboard for managing devices

Add notifications/reminders for due returns

Deploy backend (Render/Railway) + frontend (Vercel)

👨‍💻 Author

Aziz Alkiyumi
📦 GitHub: @a-alkiyumi
