const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { 
  // defino el modelo
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { 
          type: DataTypes.STRING
      }, 
      password: { 
          type: DataTypes.STRING
      },
      favourites:{
          type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      isAdmin : { 
        type: DataTypes.BOOLEAN
      }, 
      payment: { 
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
    }
  );
};
