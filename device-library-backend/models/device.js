'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {}

  Device.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      icon: { type: DataTypes.STRING, allowNull: false, defaultValue: '💻' },
      description: { type: DataTypes.TEXT, allowNull: false },
      maxLoanDays: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 7 },
      status: {
        type: DataTypes.ENUM('Available', 'Checked Out'),
        allowNull: false,
        defaultValue: 'Available',
      },
    },
    {
      sequelize,
      modelName: 'Device',
    }
  );

  Device.associate = (models) => {
    Device.hasMany(models.Booking, { foreignKey: 'deviceId' });
  };

  return Device;
};
