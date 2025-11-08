const express = require("express");
const router = express.Router();
const db = require("../models"); // Import the entire models folder

const Device = db.Device;
const Booking = db.Booking;

// ✅ GET /api/bookings?email=someone@example.com
router.get("/", async (req, res) => {
  try {
    const { email } = req.query; // read ?email=... from URL
    let bookings;

    if (email) {
      // find bookings for this user
      bookings = await Booking.findAll({
        where: { user_email: email },
        include: Device, // include device details
      });
    } else {
      // return all bookings if no email specified
      bookings = await Booking.findAll({ include: Device });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ✅ POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, deviceId, startDate, endDate } = req.body;

    console.log("Received booking data:", req.body);

    // Validate input
    if (!userName || !userEmail || !deviceId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the device exists
    const device = await Device.findByPk(deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Check if available
    if (device.status !== "available") {
      return res.status(400).json({ message: "Device not available" });
    }

    // Create booking record
    const booking = await Booking.create({
      user_name: userName,
      user_email: userEmail,
      device_id: deviceId,
      start_date: startDate,
      end_date: endDate,
      status: "booked",
    });

    // Update device status
    await device.update({ status: "not available" });

    res.json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/bookings/:id — cancel a booking and free up the device
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find booking
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Find device linked to booking
    const device = await Device.findByPk(booking.device_id);
    if (!device) {
      return res.status(404).json({ message: "Associated device not found" });
    }

    // Delete booking
    await booking.destroy();

    // Update device to available
    await device.update({ status: "available" });

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
