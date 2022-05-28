const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Medic', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    specialization: {
      type: DataTypes.STRING,
      DefaultValue: null,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    tuition_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        // Date (yyyy-MM-dd)
        is: /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
      },
    },
    tuition_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isInt: true,
        len: [4, 10],
      },
    },
  });
};
