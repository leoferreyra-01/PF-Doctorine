const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Treatment', {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    treatmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  });
};
