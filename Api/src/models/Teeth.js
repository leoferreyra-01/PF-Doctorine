const { DataTypes } = require('sequelize');
module.exports = sequelize => {
  sequelize.define(
    'Teeth', //"Medic",
    {
      ID: {
        type: DataTypes.INTEGER,
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      position: {
        type: DataTypes.INTEGER,
      },
    }
  );
};
