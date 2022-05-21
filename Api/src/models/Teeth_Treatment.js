const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Teeth_Treatment', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
};
