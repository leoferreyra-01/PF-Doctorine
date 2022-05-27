const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Evolution', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        // Date (yyyy-MM-dd)
        is: /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
      },
    },
    observations: {
      type: DataTypes.TEXT,
    },
  });
};
