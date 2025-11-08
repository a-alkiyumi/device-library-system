const { Sequelize, DataTypes } = require("sequelize");

// ✅ Create a new Sequelize instance (SQLite or your chosen DB)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Database file location
});

const db = {}; // ✅ define db before using it

// ✅ Import models
db.Device = require("./device")(sequelize, DataTypes);
db.Booking = require("./booking")(sequelize, DataTypes);

// ✅ Define relationships
db.Device.hasMany(db.Booking, { foreignKey: "device_id" });
db.Booking.belongsTo(db.Device, { foreignKey: "device_id" });

// ✅ Add Sequelize instance to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
