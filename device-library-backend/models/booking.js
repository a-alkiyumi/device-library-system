module.exports = (sequelize, DataTypes) => {
  
  /**
   * Booking Model
   * ----------------
   * Represents a record of a user borrowing a device.
   * Each booking is associated with a specific device and user,
   * including the borrowing and return dates.
   */
  
  const Booking = sequelize.define("Booking", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "booked",
    },
  });

  return Booking;
};
