const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Teeth', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    zone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
