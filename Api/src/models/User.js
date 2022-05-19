const { DataTypes } = require('sequelize');
module.export = sequalize => {
  sequelize.define('User', {
    //estaba sequialize
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userType: {
      type: DataTypes.ENUM('Medic', 'Pacient'),
      alllownull: false,
    },
    document: {
      type: DataTypes.STRING,
      alllownull: false,
    },
    name: {
      type: DataTypes.STRING(10),
      alllownull: false,
    },
    lastName: {
      type: DataTypes.STRING(10),
      alllownull: false,
    },
    birth: {
      type: DataTypes.DATE,
      alllownull: false,
    },
    telephone: {
      type: DataTypes.INTEGER(10),
    },
    cellphone: {
      type: DataTypes.INTEGER(10),
    },
    street: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
    },
    imageProfile: {
      type: DataTypes.STRING,
    },
  });
};
