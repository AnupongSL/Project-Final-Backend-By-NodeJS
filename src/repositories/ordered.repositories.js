const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoOrderedAll = async (manager) =>
  await db.Orders.findAll({
    where: {
      manager: manager,
    },
  });

exports.repoOrderedByBill = async (manager, billedit) =>
  await db.Orders.findAll({
    where: {
      manager: manager,
      billnumber: billedit,
    },
  });

exports.repoOrderedByCustomer = async (manager, namecustomer) =>
  await db.Orders.findAll({
    where: {
      manager: manager,
      namecustomer: namecustomer,
    },
  });

exports.repoSumOrdered = async (manager, timeIn, timeOut) =>
  await db.Orders.findAll({
    where: {
      manager: manager,
      createat: {
        [Op.gt]: timeIn,
        [Op.lt]: timeOut,
      },
    },
  });

exports.repoAddOrdered = async (order) => await db.Orders.create(order);

exports.repoUpdateOrdered = async (billedit, ordered, menu) =>
  await db.Orders.update(ordered, {
    where: {
      billnumber: billedit,
      menunumber: menu,
    },
  });

exports.repoRemoveOrdered = async (manager, billedit) =>
  await db.Orders.destroy({
    where: {
      manager: manager,
      billnumber: billedit
    },
  });
