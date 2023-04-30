const managerRepository = require("../repositories/manager.repositories");
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");
const { response } = require("express");

exports.servAll = async () => await managerRepository.repoAll();

exports.servByID = async (id) => await managerRepository.repoByID(id);

exports.servUnEm = async (username, email) =>
  await managerRepository.repoUnEm(username, email);

exports.servUsername = async (username) => await managerRepository.repoUsername(username);

exports.servLogin = async (username, password) => {
  const result = await managerRepository.repoUsername(username);
  if (result != "") {
    const passwordA = result[0]["password"];
    const role = result[0]["role"];
    if (passwordA == password) {
      const payload = {
        sub: username,
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

exports.servUpdateByManagerApp = async (id, manager1, username) => {
  const result = await managerRepository.repoByID(id);
  if (result) {
    const updated = await managerRepository.repoUpdateByManagerApp(id, {
      ...manager1,
      role: "manager",
      username,
    });
    if (updated) {
      return await managerRepository.repoByID(id);
    }
  }
  return null;
};

exports.servDelete = async (id) => await managerRepository.repoRemove(id);
