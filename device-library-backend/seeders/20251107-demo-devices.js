'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Devices', [
      // Laptops
      {
        name: 'MacBook Pro M3',
        type: 'Laptop',
        image: 'http://localhost:5000/images/macbook-pro-m3.jpg',
        status: 'available',
        max_borrow_duration: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dell XPS 15',
        type: 'Laptop',
        image: 'http://localhost:5000/images/dell-xps-15.jpg',
        status: 'available',
        max_borrow_duration: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HP Spectre x360',
        type: 'Laptop',
        image: 'http://localhost:5000/images/hp-spectre-x360.jpg',
        status: 'available',
        max_borrow_duration: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Smartphones
      {
        name: 'iPhone 15 Pro',
        type: 'Smartphone',
        image: 'http://localhost:5000/images/iphone-15-pro.jpg',
        status: 'available',
        max_borrow_duration: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        type: 'Smartphone',
        image: 'http://localhost:5000/images/galaxy-s24-ultra.jpg',
        status: 'available',
        max_borrow_duration: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Tablet
      {
        name: 'iPad Air',
        type: 'Tablet',
        image: 'http://localhost:5000/images/ipad-air.jpg',
        status: 'available',
        max_borrow_duration: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Devices', null, {});
  },
};
