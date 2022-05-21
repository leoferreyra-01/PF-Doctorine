const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Turn', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
};
