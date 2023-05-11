'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billnumber: {
        type: Sequelize.INTEGER
      },
      menunumber: {
        type: Sequelize.INTEGER
      },
      nameordered: {
        type: Sequelize.STRING
      },
      priceordered: {
        type: Sequelize.INTEGER
      },
      countordered: {
        type: Sequelize.INTEGER
      },
      manager: {
        type: Sequelize.STRING
      },
      usernameadmin: {
        type: Sequelize.STRING
      },
      namecustomer: {
        type: Sequelize.STRING
      },
      createAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Orders');
  }
};