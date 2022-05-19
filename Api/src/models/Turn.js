const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Turn', {
    ID_Turn: {
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    name: {
      // no  creo que haga falta
      type: DataTypes.STRING,
    },
    description: {
      // no  creo que haga falta
      type: DataTypes.STRING,
    },
  });
};
