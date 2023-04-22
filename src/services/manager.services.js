const managerRepository = require("../repositories/manager.repositories");
class Manager {
  constructor(id, name, shop_name, username, password, email, phone) {
    this.id = id;
    this.name = name;
    this.shop_name = shop_name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }
}

const manager = [
  new Manager(
    1,
    "อนุพงศ์ สูตรเลข",
    "นายน้อย",
    "anupongshop",
    "12345678",
    "donna@gmail.com",
    "0917076980"
  ),
  new Manager(
    2,
    "อัญชลีภรณ์ แสนเพ๊ชร",
    "หมึกย่างน้ำจิ้มรสเด็ด",
    "kndewshop",
    "11111111",
    "kndew@gmail.com",
    "0663259857"
  ),
];
let count = manager.length;

exports.findManagerAll = async () => await managerRepository.findAll();

exports.findManagerByID = async (id) => await managerRepository.findByID(id);

exports.findAddManager = async (manager1) =>
  await managerRepository.add({...manager1});

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