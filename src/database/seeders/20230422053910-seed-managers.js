"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.map((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });

    await queryInterface.bulkInsert("Managers", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Managers", null, {});
  },
};

const data = [
  {
    name: "สิรภพ สุขใจ",
    shop_name: "ร้านปันสุข",
    username: "sukjaishop",
    password: "12121212",
    email: "siraphop@gmail.com",
    phone: "0821534458",
    role: "manager"
},
];