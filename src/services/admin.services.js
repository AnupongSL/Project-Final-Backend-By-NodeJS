const adminRepositories = require("../repositories/admin.repositories");
const jwt = require("../middleware/jwt");

exports.servAdminAll = async (usernameManager) => await adminRepositories.repoAll(usernameManager);

exports.servByID = async (usernameManager, id) =>
  await adminRepositories.repoByID(usernameManager, id);

exports.servByName = async (usernameManager, nameAdmin) =>
  await adminRepositories.repoByName(usernameManager, nameAdmin);

exports.servByUsernameAdmin = async (usernameManager, usernameAdmin) =>
  await adminRepositories.repoByUsername(usernameManager, usernameAdmin);

exports.servByUsernameAdminUpdate = async (usernameAdmin) =>
  await adminRepositories.repoUsernameAdmin(usernameAdmin);

exports.servLoginAddmin = async (usernameadmin, passwordadmin) => {
    const result = await adminRepositories.repoUsernameAdmin(usernameadmin);
    if (result != "") {
      const passwordA = result[0]["passwordadmin"];
      const manager = result[0]["manager"]
      const role = result[0]["role"];
      if (passwordA == passwordadmin) {
        const payload = {
          sub: manager,
          usernameadmin: usernameadmin,
          role: role,
        };
        console.log(usernameadmin);
        return jwt.generateToken(payload);
      } else {
        return { message: "รหัสผ่านไม่ถูกต้อง", Status: 0 };
      }
    } else {
      return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง", Status: 1 };
    }
  };

exports.servAddAdmin = async (admin1, usernameManager, shop_name) =>
  await adminRepositories.repoAddAdmin({
    ...admin1,
    role: "admin",
    manager: usernameManager,
    shop_name: shop_name,
  });

exports.servUpdateAdmin = async (admin1, usernameAdmin) => {
  const updated = await adminRepositories.repoUpdate(usernameAdmin, {...admin1});
    if (updated) {
      return await adminRepositories.repoUsernameAdmin(usernameAdmin);
  }
  return null;
};

exports.servDeleteAdmin = async (usernameManager, id) =>
  await adminRepositories.repoRemove(usernameManager, id);
