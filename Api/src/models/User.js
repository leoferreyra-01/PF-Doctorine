const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('User', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userType: {
      type: DataTypes.ENUM('Medic', 'Patient'),
      alllownull: false,
    },
    document: {
      type: DataTypes.INTEGER,
      alllownull: false,
    },
    name: {
      type: DataTypes.STRING(10),
      alllownull: false,
    },
    lastName: {
      type: DataTypes.STRING(20),
      alllownull: false,
    },
    birth: {
      type: DataTypes.DATE,
      alllownull: false,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    cellphone: {
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
    postalCode: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      alllownull: false,
    },
    password: {
      type: DataTypes.STRING,
      alllownull: false,
    },
    imageProfile: {
      type: DataTypes.STRING,
    },
  });
};
