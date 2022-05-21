const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Pacient', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    medicalService: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
