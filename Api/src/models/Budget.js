const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Budget',
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      /*  date: {
      //timestamps,
      type: DataTypes.DATE, //DATE timestamp
      allowNull: false, // deberia de crear la fecha por defecto
    }, */
      treatments: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        defaultValue: null,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      linkPayment: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      idPayment: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      createdAt: 'creationDate',
      updatedAt: 'updateDate',
      /*   get() {
        return moment(this.getDataValue('creationDate')).format(
          'DD/MM/YYYY h:mm:ss'
        );
      }, */
    }
  );
};
