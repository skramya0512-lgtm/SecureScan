const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
console.log("CHECK SEQUELIZE:", typeof sequelize);

const Scan = sequelize.define(
  "Scan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    filepath: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    status: {
      type: DataTypes.ENUM(
        "Safe",
        "Suspicious",
        "Malicious"
      ),
      defaultValue: "Safe",
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    responseTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    https: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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