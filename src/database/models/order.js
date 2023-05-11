'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init({
    billnumber: DataTypes.NUMBER,
    menunumber: DataTypes.NUMBER,
    nameordered: DataTypes.STRING,
    priceordered: DataTypes.NUMBER,
    countordered: DataTypes.NUMBER,
    manager: DataTypes.STRING,
    usernameadmin: DataTypes.STRING,
    namecustomer: DataTypes.STRING,
    createat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orders',
    underscored: true,
    freezeTableName: true,
    underscoreAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Orders;
};