const { DataTypes } = require('sequelize');
module.exports = sequelize => {
  sequelize.define(
    'Medic',
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
      },
      tuition_date: {
        type: DataTypes.DATE,
      },
      tuition_number: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
