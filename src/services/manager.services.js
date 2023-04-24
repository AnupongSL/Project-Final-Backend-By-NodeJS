const managerRepository = require("../repositories/manager.repositories");

exports.findManagerAll = async () => await managerRepository.findAll();

exports.findManagerByID = async (id) => await managerRepository.findByID(id);

exports.findManagerByUsername = async (username, email) => await managerRepository.checkUser(username, email);

exports.findManagerByUsername_password = async (username, password) => await managerRepository.checkUserPass(username, password);

exports.findAddManager = async (manager1) => await managerRepository.add({...manager1});;
exports.findUpdateManager = async (id, manager1) => {
  const result = await managerRepository.findByID(id);
  if (result) {
    const updated = await managerRepository.update(result.id, { ...manager1 });
    if (updated) {
        return await managerRepository.findByID(id);
      }
  }
  return null;
};

exports.findDeleteManager = async (id) => await managerRepository.remove(id)