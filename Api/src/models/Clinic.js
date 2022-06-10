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
      unique: true,
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
    turnStandardDuration: {
      type: DataTypes.FLOAT,
      defaultValue: 0.5,
    },
    imgLogo: {
      type: DataTypes.STRING,
      defaultValue:
        'https://img.freepik.com/vector-gratis/logo-clinica-dental-diseno-plano_23-2148125146.jpg',
      validate: {
        isUrl: true,
      },
    },
  });
};
