const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Evolution', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
};
