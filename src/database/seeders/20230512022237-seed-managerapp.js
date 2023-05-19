"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.map((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });

    await queryInterface.bulkInsert("Managerapps", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Managerapps", null, {});
  },
};

const data = [
  {
    namemanagerapp: "อนุพงศ์ สูตรเลข",
    username: "anpongsutlek",
    password: "0917076980za",
    role: "owner",
    mobile: "0917076980",
    email: "anupongsutlek022@gmail.com",
    token: "undefined"
},
];