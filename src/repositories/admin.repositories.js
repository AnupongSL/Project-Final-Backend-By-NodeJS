const db = require("../database/models");
const { Op } = require("sequelize");

exports.repoAll = async (manager) =>
  await db.Admins.findAll({
    where: {
      manager: manager,
    },
  });

exports.repoByID = async (manager, id) =>
  await db.Admins.findAll({
    where: {
      manager: manager,
      id: id,
    },
  });

exports.repoByName = async (manager, nameadmin) =>
  await db.Admins.findAll({
    where: {
      manager: manager,
      nameadmin: nameadmin,
    },
  });

exports.repoByUsername = async (manager, usernameadmin) =>
  await db.Admins.findAll({
    where: {
      manager: manager,
      usernameadmin: usernameadmin,
    },
  });

exports.repoByUsernameAndEmailAdmin = async (usernameAdmin, emailAdmin) =>
  await db.Admins.findAll({
    where: {
      [Op.or]: [{ usernameadmin: usernameAdmin }, { emailadmin: emailAdmin }],
    },
  });

exports.repoUsernameAdmin = async (usernameadmin) =>
  await db.Admins.findAll({
    where: {
      usernameadmin: usernameadmin,
    },
  });

exports.repoUpdateTokenAdmin = async (email, token) =>
  await db.Admins.update(token, {
    where: {
      emailadmin: email,
    },
  });

exports.repoResetPasswordAdmin = async (myValue, passwordadmin) =>
  await db.Admins.update(passwordadmin, {
    where: {
      token: myValue,
    },
  });


exports.repoByEmailAdmin = async (email) =>
  await db.Admins.findAll({
    where: {
      emailadmin: email,
    },
  });

exports.repoAddAdmin = async (admin1) => await db.Admins.create(admin1);

exports.repoUpdate = async (usernameAdmin, admin1) =>
  await db.Admins.update(admin1, {
    where: {
      usernameadmin: usernameAdmin,
    },
  });

exports.repoRemove = async (manager, id) =>
  await db.Admins.destroy({
    where: {
      manager: manager,
      id: id,
    },
  });
