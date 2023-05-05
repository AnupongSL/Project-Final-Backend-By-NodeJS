const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoSumProductAll = async (manager) =>
  await db.Sumproducts.findAll({
    where: {
      manager: manager,
    },
  });

exports.repoSumProduct = async (manager, timeIn, timeOut) =>
  await db.Sumproducts.findAll({
    where: {
      manager: manager,
      created_at: {
        [Op.gt]: timeIn,
        [Op.lt]: timeOut,
      },
    },
  });


exports.repoAddSumProduct = async (sumproduct1) =>
  await db.Sumproducts.create(sumproduct1);

exports.repoRemoveSumProduct = async (manager, id) =>
  await db.Sumproducts.destroy({
    where: {
      manager: manager,
      id: id,
    },
  });
