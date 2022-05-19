const { DataTypes} = require ('sequelize');

module.export = (sequelize)=>{
    sequelize.define({
        ID_Clinic:{
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
        },
        stret:{
            type: DataTypes.STRING
        },
        number:{
            type: DataTypes.INTEGER
        },
        city:{
            type: DataTypes.STRING
        },
        postalcode:{
            type: DataTypes.INTEGER
        },
        telephone:{
            type: DataTypes.INTEGER(10)
        },
        email:{
            type: DataTypes.STRING
        },
        officeHours:{
            type: DataTypes.JSON
        },
        imgLogo:{
            type:DataTypes.STRING
        }

    })
}