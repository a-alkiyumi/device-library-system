module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define("Device", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "available",
    },
    max_borrow_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Device;
};
