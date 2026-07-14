'use strict';

const express = require('express');
const { Booking, Device } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'email query parameter is required' });
  }

  const bookings = await Booking.findAll({
    where: { email: String(email).toLowerCase().trim() },
    include: [{ model: Device }],
    order: [['bookedAt', 'DESC']],
  });

  res.json(bookings);
});

router.post('/:id/return', async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, { include: [{ model: Device }] });
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  if (booking.returnedAt) {
    return res.status(409).json({ error: 'This booking was already returned' });
  }

  booking.returnedAt = new Date();
  await booking.save();

  booking.Device.status = 'Available';
  await booking.Device.save();

  res.json(booking);
});

module.exports = router;
