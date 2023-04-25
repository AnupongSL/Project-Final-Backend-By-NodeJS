"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.map((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });

    await queryInterface.bulkInsert("Admins", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};

const data = [
  {
    manager: "siraphop1",
    nameadmin: "admin-aek",
    phoneadmin: "0921162236",
    emailadmin: "nongaek@gmail.com",
    usernameadmin: "aek1234",
    passwordadmin: "12345678",
    role: "admin"
},
];