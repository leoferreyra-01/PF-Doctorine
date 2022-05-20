const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Medic",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ID_Medic: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      specialization:{
       type:DataTypes.STRING
      },
      tuition_date:{
        type: DataTypes.DATE
        
      },
      tuition_number:{
        type: DataTypes.INTEGER
      }
    },
    { timestamps: false }
  );
};
