const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Turn', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.FLOAT,
      DefaultValue: 0.5,
    },
    description: {
      type: DataTypes.TEXT,
    },
    medicAccepts: {
      type: DataTypes.BOOLEAN,
      DefaultValue: false,
    },
    patientAccepts: {
      type: DataTypes.BOOLEAN,
      DefaultValue: false,
    },
  });
};
