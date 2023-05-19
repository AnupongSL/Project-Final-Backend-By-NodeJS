'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manager: {
        type: Sequelize.STRING
      },
      shop_name: {
        type: Sequelize.STRING
      },
      nameadmin: {
        type: Sequelize.STRING
      },
      phoneadmin: {
        type: Sequelize.STRING
      },
      emailadmin: {
        type: Sequelize.STRING
      },
      usernameadmin: {
        type: Sequelize.STRING
      },
      passwordadmin: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING,
        defaultValue: "undefined"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins');
  }
};