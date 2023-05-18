const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoAll = async () =>
  await db.Managers.findAll({
    order: [["id", "ASC"]],
  });

exports.repoByID = async (id) => await db.Managers.findByPk(id);

exports.repoUnEm = async (username, email) =>
  await db.Managers.findAll({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });

exports.repoUsername = async (username) =>
  await db.Managers.findAll({
    where: {
      username: username,
    },
  });
exports.repoByEmail = async (email) =>
  await db.Managers.findAll({
    where: {
      email: email,
    },
  });

exports.repoAdd = async (manager1) => await db.Managers.create(manager1);

exports.repoUpdateToken = async (email, token) =>
  await db.Managers.update(token, {
    where: {
      email: email,
    },
  });

exports.repoUpdate = async (username, manager1) =>
  await db.Managers.update(manager1, {
    where: {
      username: username,
    },
  });

exports.repoUpdateByManagerApp = async (id, manager1) =>
  await db.Managers.update(manager1, {
    where: {
      id: id,
    },
  });

exports.repoRemove = async (id) =>
  await db.Managers.destroy({
    where: {
      id: id,
    },
  });
