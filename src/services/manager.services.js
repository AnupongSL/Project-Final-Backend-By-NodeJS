const managerRepository = require("../repositories/manager.repositories");
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");

exports.servAll = async () => await managerRepository.repoAll();

exports.servByID = async (id) => await managerRepository.repoByID(id);

exports.servUnEm = async (username, email) =>
  await managerRepository.repoUnEm(username, email);

exports.servLogin = async (username, password) => {
  const result = await managerRepository.repoUsername(username);
  if (result != "") {
    const myArray = result;
    const passwordA = myArray[0]["password"];
    const role = myArray[0]["role"];
    if (passwordA == password) {
      const payload = {
        sub: username,
        role: role,
      };
      return jwt.generateToken(payload);
    }
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

exports.servDelete = async (id) => await managerRepository.repoRemove(id);
