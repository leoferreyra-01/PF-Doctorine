const { DataTypes } = require('sequelize');
module.exports = sequelize => {
  sequelize.define('TeethTreatment', {
    ID: {
      type: DataTypes.INTEGER,
    },
  });
};
