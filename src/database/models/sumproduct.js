'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sumproducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sumproducts.init({
    manager: DataTypes.STRING,
    nameproduct: DataTypes.STRING,
    priceproduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sumproducts',
    underscored: true,
    freezeTableName: true,
    underscoreAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Sumproducts;
};