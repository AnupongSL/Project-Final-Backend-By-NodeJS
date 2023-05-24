const ownerServices = require("../services/owner.services");
const bcrypt = require("bcryptjs");

let passwordHash;

exports.getOwner = async (req, res) =>
  res.json(await ownerServices.servGetOwner());

exports.loginOwner = async (req, res) => {
  const { username, password } = req.body;
  const result = await ownerServices.servUsernameOwner(username);
  if (result != "") {
    const checkPassword = result[0]["password"];
    const isMatch = await bcrypt.compare(password, checkPassword);
    if (isMatch == true) {
      const token = await ownerServices.servLoginOwner(username, password);
      if (!token) {
        res
          .status(200)
          .json({ msg: `ไม่พบผู้ดูแลเว็บ username ${username} ในระบบ` });
        return;
      }
      res.json({ token });
    } else {
      res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: false });
    }
  } else {
    res.status(200).json({ msg: "ไม่พบผู้ใช้ในระบบ", Status: false });
  }
};

exports.updateOwner = async (req, res) => {
  const result = await ownerServices.servUsernameOwner(req.username);
  if (result) {
    const checkPassword = result[0]["password"];
    const password = req.body.password;
    const newPassword = req.body.newpassword;
    const isMatch = await bcrypt.compare(password, checkPassword);
    if (isMatch) {
      if(newPassword != ""){
        const salt = await securePassword(newPassword)
        passwordHash = salt;
      } else{
        passwordHash = checkPassword
      }
      const dataUpdate = await ownerServices.servUpdateOwner(
        req.body,
        passwordHash,
        req.username
      );
      res.status(200).json({
        msg: "อัพเดทข้อมูลผู้จัดการเว็บเรียบร้อยแล้ว",
        Status: true,
        dataUpdate,
      });
    } else {
      res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: false });
    }
  } else {
    res
      .status(200)
      .json({ msg: "อัพเดทข้อมูลผู้จัดการเว็บไม่สำเร็จ", Status: false });
  }
};

const securePassword = async(password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
}