const db = require("../database/models");

exports.repoDataOwner = async () => await db.Managerapps.findAll();

exports.repoOwnerUsername = async (username) =>
  await db.Managerapps.findAll({
    where: {
        username: username,
    },
  });

exports.repoUpdateOwner = async (username, owner) =>
  await db.Managerapps.update(owner, {
    where: {
      username: username,
    },
  });

