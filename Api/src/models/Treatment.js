const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Treatment', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    treatmentType: {
      type: DataTypes.ENUM(
        'consultas',
        'operatoria',
        'endodoncia',
        'protesis',
        'prevencion',
        'ortodoncia',
        'odontopediatria',
        'periodoncia',
        'radiologia',
        'cirugia',
        'implantologiaBucal',
        'prestacionesVarias'
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });
};
