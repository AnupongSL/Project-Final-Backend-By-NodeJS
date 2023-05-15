'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admins.init({
    manager: DataTypes.STRING,
    shop_name: DataTypes.STRING,
    nameadmin: DataTypes.STRING,
    phoneadmin: DataTypes.STRING,
    emailadmin: DataTypes.STRING,
    usernameadmin: DataTypes.STRING,
    passwordadmin: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admins',
    underscored: true,
    freezeTableName: true,
    underscoreAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Admins;
};