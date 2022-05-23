const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Clinic', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    postalcode: {
      type: DataTypes.INTEGER,
    },
    telephone: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    officeHours: {
      type: DataTypes.JSON,
    },
    imgLogo: {
      type: DataTypes.STRING,
    },
  });
};
