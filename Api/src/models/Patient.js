const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Patient', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    medicalService: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    showClinicalHistory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tutor: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });
};
