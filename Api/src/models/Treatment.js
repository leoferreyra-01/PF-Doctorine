const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Treatment', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    treatmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });
};
