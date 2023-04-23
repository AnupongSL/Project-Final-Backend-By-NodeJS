const db = require("../database/models");
const { Op } = require("sequelize");
exports.findAll = async () =>
  await db.Managers.findAll({
    order: [["id", "ASC"]],
  });

exports.findByID = async (id) => await db.Managers.findByPk(id);

exports.checkUser = async (username, email) =>
  await db.Managers.findAll({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });

exports.checkUserPass = async (username) =>
  await db.Managers.findAll({
    where: {
      username: username,
    },
  });

exports.add = async (manager1) => await db.Managers.create(manager1);

exports.update = async (id, manager1) =>
  await db.Managers.update(manager1, {
    where: {
      id: id,
    },
  });

exports.remove = async (id) =>
  await db.Managers.destroy({
    where: {
      id: id,
    },
  });
