const managerRepository = require("../repositories/manager.repositories");
const adminRepositories = require("../repositories/admin.repositories");
const ownerRepositories = require("../repositories/owner.repositories");
const jwt = require("../middleware/jwt");

exports.servAll = async () => await managerRepository.repoAll();

exports.servByID = async (id) => await managerRepository.repoByID(id);

exports.servUnEm = async (username, email) =>
  await managerRepository.repoUnEm(username, email);

exports.servByEmail = async (email) => {
  const emailManager = await managerRepository.repoByEmail(email);
  if (emailManager != "") {
    return emailManager;
  } else {
    const emailAdmin = await adminRepositories.repoByEmailAdmin(email);
    if (emailAdmin != "") {
      return emailAdmin;
    } else {
      const emailOwner = await ownerRepositories.repoByEmailOwner(email);
      if (emailOwner != "") {
        return emailOwner;
      }
    }
  }
};
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

exports.servResetPassword = async (myValue, password, roleToken) => {
  if (roleToken == "manager") {
    const updated = await managerRepository.repoResetPassword(myValue, {
      password: password,
      token: "undefined",
    });
    return updated;
  } else if (roleToken == "admin") {
    const updatedPasswordAdmin = await adminRepositories.repoResetPasswordAdmin(
      myValue,
      {
        passwordadmin: password,
        token: "undefined",
      }
    );
    return updatedPasswordAdmin;
  } else if (roleToken == "owner") {
    const updatedPasswordOwner = await ownerRepositories.repoResetPasswordOwner(
      myValue,
      {
        password: password,
        token: "undefined",
      }
    );
    return updatedPasswordOwner;
  }
};
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
  return undefined;
};

exports.servupdateToken = async (email, randomString, roleToken) => {
  if (roleToken == "manager") {
    const updateTokenManager = await managerRepository.repoUpdateToken(email, {
      token: randomString,
    });
    return updateTokenManager;
  } else if (roleToken == "admin") {
    const updateTokenAdmin = await adminRepositories.repoUpdateTokenAdmin(
      email,
      {
        token: randomString,
      }
    );
    return updateTokenAdmin;
  } else if (roleToken == "owner") {
    const updateTokenOwner = await ownerRepositories.repoUpdateTokenOwner(
      email,
      {
        token: randomString,
      }
    );
    return updateTokenOwner;
  }
};
exports.servDelete = async (id) => await managerRepository.repoRemove(id);
