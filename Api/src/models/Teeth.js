const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Medic",
    {
      zone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ID_Teeth: {
        type: DataTypes.INTEGER
     
    },
    position:{
        type: DataTypes.INTEGER
    }


}
  );
};
