const db = require("../database/models");

exports.repoDataOwner = async () => await db.Managerapps.findAll();

exports.repoOwnerUsername = async (username) =>
  await db.Managerapps.findAll({
    where: {
      username: username,
    },
  });
exports.repoByEmailOwner = async (email) =>
  await db.Managerapps.findAll({
    where: {
      email: email,
    },
  });

exports.repoUpdateTokenOwner = async (email, token) =>
  await db.Managerapps.update(token, {
    where: {
      email: email,
    },
  });

exports.repoResetPasswordOwner = async (myValue, password) =>
  await db.Managerapps.update(password, {
    where: {
      token: myValue,
    },
  });

exports.repoUpdateOwner = async (username, owner) =>
  await db.Managerapps.update(owner, {
    where: {
      username: username,
    },
  });
