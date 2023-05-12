const ownerRepositories = require("../repositories/owner.repositories");
const jwt = require("../middleware/jwt");

exports.servGetOwnerAll = async () => await ownerRepositories.repoOwnerAll();

exports.servUsernameOwner = async (username) =>
  await ownerRepositories.repoOwnerUsername(username);

exports.servOwnerByID = async (id) => await ownerRepositories.repoOwnerID(id);

exports.servAddOwner = async (owner) =>
  await ownerRepositories.repoAddOwner({ ...owner, role: "adminapp" });

exports.servLoginOwner = async (username, password) => {
  const result = await ownerRepositories.repoOwnerUsername(username);
  if (result != "") {
    const passwordA = result[0]["password"];
    const nameowner = result[0]["namemanagerapp"];
    const role = result[0]["role"];
    if (passwordA == password) {
      const payload = {
        sub: nameowner,
        username: username,
        role: role,
      };
      return jwt.generateToken(payload);
    } else {
      return { message: "รหัสผ่านไม่ถูกต้อง", Status: 0 };
    }
  } else {
    return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง", Status: 1 };
  }
};

exports.servUpdateOwner = async (owner, id) => {
  const updated = await ownerRepositories.repoUpdateOwner(id, { ...owner });
  if (updated) {
    return await ownerRepositories.repoOwnerID(id);
  }
  return null;
};

exports.servDeleteOwner = async (id) =>
  await ownerRepositories.repoRemoveOwner(id);
