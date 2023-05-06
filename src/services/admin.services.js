const adminRepositories = require("../repositories/admin.repositories");
const jwt = require("../middleware/jwt");

exports.servAdminAll = async (usernameManager) => await adminRepositories.repoAll(usernameManager);

exports.servByID = async (usernameManager, id) =>
  await adminRepositories.repoByID(usernameManager, id);

exports.servByName = async (usernameManager, nameAdmin) =>
  await adminRepositories.repoByName(usernameManager, nameAdmin);

exports.servByUsernameAdmin = async (usernameManager, usernameAdmin) =>
  await adminRepositories.repoByUsername(usernameManager, usernameAdmin);

exports.servLoginAddmin = async (usernameadmin, passwordadmin) => {
    const result = await adminRepositories.repoUsernameAdmin(usernameadmin);
    if (result != "") {
      const passwordA = result[0]["passwordadmin"];
      const manager = result[0]["manager"]
      const role = result[0]["role"];
      const nameadmin = result[0]["nameadmin"]
      if (passwordA == passwordadmin) {
        const payload = {
          sub: manager,
          usernameadmin: usernameadmin,
          nameadmin, nameadmin,
          role: role,
        };
        return jwt.generateToken(payload);
      } else {
        return { message: "รหัสผ่านไม่ถูกต้อง" };
      }
    } else {
      return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง" };
    }
  };

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
