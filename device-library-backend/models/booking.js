'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {}

  Booking.init(
    {
      deviceId: { type: DataTypes.INTEGER, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      bookedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      dueDate: { type: DataTypes.DATE, allowNull: false },
      returnedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.Device, { foreignKey: 'deviceId' });
  };

  return Booking;
};
