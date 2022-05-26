const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('User', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userType: {
      type: DataTypes.ENUM('Medic', 'Patient'),
      alllownull: false,
    },
    document: {
      type: DataTypes.INTEGER,
      alllownull: false,
      unique: true,
      validate: {
        isInt: true,
      },
    },
    name: {
      type: DataTypes.STRING(10),
      alllownull: false,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    lastName: {
      type: DataTypes.STRING(20),
      alllownull: false,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    birth: {
      type: DataTypes.DATEONLY,
      alllownull: false,
      validate: {
        // Date (yyyy-MM-dd)
        is: /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
      },
    },
    telephone: {
      type: DataTypes.STRING,
      validate: {
        // see https://regexr.com/39t6d for number formats.
        is: /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g,
      },
    },
    cellphone: {
      type: DataTypes.STRING,
      validate: {},
    },
    street: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    number: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    postalCode: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      alllownull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      alllownull: false,
      validate: {
        notEmpty: true,
        // - at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      },
    },
    imageProfile: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  });
};
