const sequelize = require('./models');
const User = require('./models/user');
const Device = require('./models/device');
const Booking = require('./models/booking');

async function seed() {
  await sequelize.sync({ force: true });

  await User.create({
    username: 'aziz',
    password: '12345',
    email: 'aziz@example.com'
  });

  await Device.bulkCreate([
    { name: 'Laptop', type: 'Electronics', image: '', max_borrow_duration: 7 },
    { name: 'Camera', type: 'Electronics', image: '', max_borrow_duration: 3 },
    { name: 'Projector', type: 'Electronics', image: '', max_borrow_duration: 5 },
  ]);

  console.log('✅ Database seeded successfully');
  process.exit();
}

seed();
