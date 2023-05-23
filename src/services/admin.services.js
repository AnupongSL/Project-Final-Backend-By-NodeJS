const adminRepositories = require("../repositories/admin.repositories");
const jwt = require("../middleware/jwt");

exports.servAdminAll = async (usernameManager) =>
  await adminRepositories.repoAll(usernameManager);

exports.servByID = async (usernameManager, id) =>
  await adminRepositories.repoByID(usernameManager, id);

exports.servByName = async (usernameManager, nameAdmin) =>
  await adminRepositories.repoByName(usernameManager, nameAdmin);

exports.servByUsernameAdmin = async (usernameManager, usernameAdmin) =>
  await adminRepositories.repoByUsername(usernameManager, usernameAdmin);

exports.servByUsernameAndEmailAdmin = async (usernameAdmin, emailAdmin) =>
  await adminRepositories.repoByUsernameAndEmailAdmin(
    usernameAdmin,
    emailAdmin
  );

exports.servByUsernameAdminUpdate = async (usernameAdmin) =>
  await adminRepositories.repoUsernameAdmin(usernameAdmin);

exports.servLoginAddmin = async (usernameadmin) => {
  const result = await adminRepositories.repoUsernameAdmin(usernameadmin);
  if (result != "") {
    const manager = result[0]["manager"];
    const role = result[0]["role"];
    const payload = {
      sub: manager,
      usernameadmin: usernameadmin,
      role: role,
    };
    return jwt.generateToken(payload);
  } else {
    return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง", Status: 1 };
  }
};

exports.servAddAdmin = async (
  admin1,
  passwordHash,
  usernameManager,
  shop_name
) =>
  await adminRepositories.repoAddAdmin({
    ...admin1,
    passwordadmin: passwordHash,
    role: "admin",
    manager: usernameManager,
    shop_name: shop_name,
  });

exports.servUpdateAdmin = async (admin1, passwordHash, usernameAdmin) => {
  const updated = await adminRepositories.repoUpdate(usernameAdmin, {
    ...admin1,
    passwordadmin: passwordHash,
  });
  if (updated) {
    return await adminRepositories.repoUsernameAdmin(usernameAdmin);
  }
  return null;
};

exports.servDeleteAdmin = async (usernameManager, id) =>
  await adminRepositories.repoRemove(usernameManager, id);
