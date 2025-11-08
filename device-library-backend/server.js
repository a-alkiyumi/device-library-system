const express = require("express");
const cors = require("cors");
const db = require("./models");  // Imports all models (Device, Booking, etc.)

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));


// Routes
const deviceRoutes = require("./routes/devices");
const bookingRoutes = require("./routes/bookings");

app.use("/api/devices", deviceRoutes);
app.use("/api/bookings", bookingRoutes);

// Sync database and then start server
db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
  });
});
