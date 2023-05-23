const ownerRepositories = require("../repositories/owner.repositories");
const jwt = require("../middleware/jwt");

exports.servGetOwner = async () => await ownerRepositories.repoDataOwner();

exports.servUsernameOwner = async (username) =>
  await ownerRepositories.repoOwnerUsername(username);

exports.servLoginOwner = async (username) => {
  const result = await ownerRepositories.repoOwnerUsername(username);
  if (result != "") {
    const nameowner = result[0]["namemanagerapp"];
    const role = result[0]["role"];
    const payload = {
      username: username,
      role: role,
    };
    return jwt.generateToken(payload);
  } else {
    return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง", Status: 1 };
  }
};

exports.servUpdateOwner = async (owner, passwordHash, username) => {
  const updated = await ownerRepositories.repoUpdateOwner(username, {
    ...owner,
    password: passwordHash,
  });
  if (updated) {
    return await ownerRepositories.repoOwnerUsername(username);
  }
  return null;
};
