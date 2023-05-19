const db = require("../database/models");

exports.repoProductAll = async (manager) =>
await db.Products.findAll({
  where: {
    manager: manager,
  },
});

exports.repoProductByID = async (manager, id) =>
  await db.Products.findAll({
    where: {
      manager: manager,
      id: id,
    },
  });

exports.repoProductByName = async (manager, nameproduct) =>
  await db.Products.findAll({
    where: {
      manager: manager,
      nameproduct: nameproduct,
    },
  });

exports.repoAddProduct = async (product1) => await db.Products.create(product1);

exports.repoUpdateProduct = async (id, admin1) =>
  await db.Products.update(admin1, {
    where: {
      id: id,
    },
  });

exports.repoRemoveProduct = async (manager, id) =>
  await db.Products.destroy({
    where: {
      manager: manager,
      id: id,
    },
  });
