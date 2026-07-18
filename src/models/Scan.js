const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Scan = sequelize.define(
  "Scan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Safe", "Malicious", "Suspicious"),
      defaultValue: "Safe",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    scannedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "scans",
    timestamps: false,
  }
);

module.exports = Scan;