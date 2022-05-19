const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    'Pacient',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      medicalService: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false } //eliminar
  );
};
