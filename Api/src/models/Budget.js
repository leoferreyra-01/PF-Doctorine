const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Budget', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    treatments: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
