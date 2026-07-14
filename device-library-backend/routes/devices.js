'use strict';

const express = require('express');
const { Device, Booking } = require('../models');

const router = express.Router();

const EMAIL_RE = /^\S+@\S+\.\S+$/;

router.get('/', async (req, res) => {
  const devices = await Device.findAll({ order: [['id', 'ASC']] });
  res.json(devices);
});

router.get('/:id', async (req, res) => {
  const device = await Device.findByPk(req.params.id);
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  let availableFrom = null;
  if (device.status === 'Checked Out') {
    const activeBooking = await Booking.findOne({
      where: { deviceId: device.id, returnedAt: null },
      order: [['dueDate', 'ASC']],
    });
    availableFrom = activeBooking ? activeBooking.dueDate : null;
  }

  res.json({ ...device.toJSON(), availableFrom });
});

router.post('/:id/book', async (req, res) => {
  const { email, firstName, lastName } = req.body || {};

  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: 'email, firstName, and lastName are required' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  const device = await Device.findByPk(req.params.id);
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }
  if (device.status !== 'Available') {
    return res.status(409).json({ error: 'This device is not available right now' });
  }

  const bookedAt = new Date();
  const dueDate = new Date(bookedAt.getTime() + device.maxLoanDays * 24 * 60 * 60 * 1000);

  const booking = await Booking.create({
    deviceId: device.id,
    email: email.toLowerCase().trim(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    bookedAt,
    dueDate,
  });

  device.status = 'Checked Out';
  await device.save();

  res.status(201).json(booking);
});

module.exports = router;
