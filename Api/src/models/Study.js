const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Study', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studyType: {
      type: DataTypes.ENUM('laboratory', 'complementary'),
    },
    description: {
      type: DataTypes.TEXT,
    },
    attach: {
      type: DataTypes.STRING,
    },
  });
};
