const adminRepositories = require("../repositories/admin.repositories");

exports.servAdminAll = async (usernameManager) => await adminRepositories.repoAll(usernameManager);

exports.servByID = async (usernameManager, id) =>
  await adminRepositories.repoByID(usernameManager, id);

exports.servByName = async (usernameManager, nameAdmin) =>
  await adminRepositories.repoByName(usernameManager, nameAdmin);

exports.servByUsernameAdmin = async (usernameManager, usernameAdmin) =>
  await adminRepositories.repoByUsername(usernameManager, usernameAdmin);

exports.servAddAdmin = async (admin1, usernameManager) =>
  await adminRepositories.repoAddAdmin({
    ...admin1,
    role: "admin",
    manager: usernameManager,
  });

exports.servUpdateAdmin = async (admin1, usernameManager, id) => {
  const updated = await adminRepositories.repoUpdate(id, {...admin1});
    if (updated) {
      return await adminRepositories.repoByID(usernameManager, id);
  }
  return null;
};

exports.servDeleteAdmin = async (usernameManager, id) =>
  await adminRepositories.repoRemove(usernameManager, id);
