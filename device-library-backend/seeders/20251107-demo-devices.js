'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Devices', [
      {
        name: 'MacBook Pro M3',
        type: 'Laptop',
        image: 'https://via.placeholder.com/150',
        status: 'available',
        max_borrow_duration: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'iPhone 15 Pro',
        type: 'Smartphone',
        image: 'https://via.placeholder.com/150',
        status: 'available',
        max_borrow_duration: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'iPad Air',
        type: 'Tablet',
        image: 'https://via.placeholder.com/150',
        status: 'available',
        max_borrow_duration: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Devices', null, {});
  }
};
