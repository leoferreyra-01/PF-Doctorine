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
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officeHours: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    imgLogo: {
      type: DataTypes.STRING,
      /* allowNull: false, */
    },
  });
};
