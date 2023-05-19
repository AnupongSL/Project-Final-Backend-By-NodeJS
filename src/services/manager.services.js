const managerRepository = require("../repositories/manager.repositories");
const jwt = require("../middleware/jwt");

exports.servAll = async () => await managerRepository.repoAll();

exports.servByID = async (id) => await managerRepository.repoByID(id);

exports.servUnEm = async (username, email) =>
  await managerRepository.repoUnEm(username, email);

exports.servByEmail = async (email) =>
  await managerRepository.repoByEmail(email);

exports.servUsername = async (username) =>
  await managerRepository.repoUsername(username);

exports.servLogin = async (username, password) => {
  const result = await managerRepository.repoUsername(username);
  if (result != "") {
    const passwordA = result[0]["password"];
    const shopName = result[0]["shop_name"];
    const role = result[0]["role"];
    if (passwordA == password) {
      const payload = {
        sub: username,
        shop_name: shopName,
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

exports.servAdd = async (manager1) =>
  await managerRepository.repoAdd({ ...manager1, role: "manager" });

exports.servUpdate = async (username, manager1) => {
  const result = await managerRepository.repoUsername(username);
  if (result) {
    const updated = await managerRepository.repoUpdate(username, {
      ...manager1,
      role: "manager",
      username,
    });
    if (updated) {
      return await managerRepository.repoUsername(username);
    }
  }
  return null;
};

exports.servupdateToken = async (email, randomString) =>
  await managerRepository.repoUpdateToken(email, {
    token: randomString,
  });

exports.servDelete = async (id) => await managerRepository.repoRemove(id);
