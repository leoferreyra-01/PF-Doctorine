const { DataTypes } = require('sequelize');
module.exports = sequelize => {
  sequelize.define('Evolution', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
};
