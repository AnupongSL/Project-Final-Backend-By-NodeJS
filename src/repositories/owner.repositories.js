const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoOwnerAll = async () => await db.Managerapps.findAll();

exports.repoOwnerUsername = async (username) =>
  await db.Managerapps.findAll({
    where: {
        username: username,
    },
  });

exports.repoOwnerID = async (id) =>
  await db.Managerapps.findAll({
    where: {
        id: id,
    },
  });

exports.repoAddOwner = async (owner) => await db.Managerapps.create(owner);

exports.repoUpdateOwner = async (id, owner) =>
  await db.Managerapps.update(owner, {
    where: {
      id: id,
    },
  });

exports.repoRemoveOwner = async (id) =>
  await db.Managerapps.destroy({
    where: {
      id: id,
    },
  });
