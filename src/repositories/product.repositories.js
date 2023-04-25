const db = require("../database/models");
const { Op } = require("sequelize");

exports.findManager = async (manager) =>
await db.Products.findAll({
  where: {
    manager: manager,
  },
});

exports.findAll = async () =>
  await db.Products.findAll({
    order: [["id", "ASC"]],
  });

exports.findByID = async (id) => await db.Products.findByPk(id);

exports.findByName = async (nameproduct) =>
  await db.Products.findAll({
    where: {
        nameproduct: nameproduct,
    },
  });

exports.add = async (product1) => await db.Products.create(product1);

exports.update = async (id, product1) =>
  await db.Products.update(product1, {
    where: {
      id: id,
    },
  });

exports.remove = async (id) =>
  await db.Products.destroy({
    where: {
      id: id,
    },
  });
