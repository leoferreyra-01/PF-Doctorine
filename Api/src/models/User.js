const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = sequelize => {
  sequelize.define('User', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userType: {
      type: DataTypes.ENUM('Medic', 'Patient'),
      defaultValue: 'Patient',
      allowNull: false,
    },
    document: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isInt: true,
        min: 1000000,
        max: 99999999,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // is name or lastname or a string with accent and apostrophes
        is: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        // Date (yyyy-MM-dd)
        is: /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
      },
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const birth = new Date(this.birth);
        const today = new Date();
        let difference = today.getTime() - birth.getTime();
        return Math.ceil(difference / (1000 * 3600 * 24 * 365));
      },
      set(value) {
        throw new Error('Do not try to set the `age` value!');
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
      validate: {
        // see https://regexr.com/39t6d for number formats.
        is: /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g,
      },
    },
    street: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        // as name + numbers, no symbols
        is: /[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
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
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        if (value) {
          const hashValue = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashValue);
        } else {
          const userDocument = this.name + this.document;

          const hashNameDocument = bcrypt.hashSync(userDocument, 10);
          this.setDataValue('password', hashNameDocument);
        }
      },
      validate: {
        notEmpty: true,
        // At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      },
    },
    imageProfile: {
      type: DataTypes.STRING,
      defaultValue:
        'https://pngimage.net/wp-content/uploads/2018/06/happy-customer-icon-png-5.png', //temporal
      validate: {
        isUrl: true,
      },
    },
  });
};
