'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize, Device, Booking } = require('./models');
const devicesRouter = require('./routes/devices');
const bookingsRouter = require('./routes/bookings');
const deviceSeedData = require('./seeders/deviceSeedData');
const bookingSeedData = require('./seeders/bookingSeedData');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/devices', devicesRouter);
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 5000;

async function seed() {
  const count = await Device.count();
  if (count > 0) return;

  const devicesByName = {};
  for (const data of deviceSeedData) {
    devicesByName[data.name] = await Device.create(data);
  }

  for (const b of bookingSeedData) {
    const device = devicesByName[b.deviceName];
    if (!device) continue;

    const bookedAt = new Date();
    const dueDate = new Date(bookedAt.getTime() + device.maxLoanDays * 24 * 60 * 60 * 1000);

    await Booking.create({
      deviceId: device.id,
      email: b.email,
      firstName: b.firstName,
      lastName: b.lastName,
      bookedAt,
      dueDate,
    });
  }
}

async function start() {
  await sequelize.sync();
  await seed();

  app.listen(PORT, () => {
    console.log(`Device Library API running on http://localhost:${PORT}`);
  });
}

start();
