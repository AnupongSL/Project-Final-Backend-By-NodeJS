const adminServices = require("../services/admin.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let passwordHash;

exports.getAdminAll = async (req, res) =>
  res.json(await adminServices.servAdminAll(req.sub));

exports.getAdminByID = async (req, res) => {
  const result = await adminServices.servByID(req.sub, req.params.id);
  if (result !== "") {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.getAdminByName = async (req, res) => {
  const result = await adminServices.servByName(req.sub, req.body.nameadmin);
  if (result !== "") {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.getAdminByUsername = async (req, res) => {
  const result = await adminServices.servByUsernameAdmin(
    req.sub,
    req.body.usernameadmin
  );
  if (result !== "") {
    res.json(result);
  } else {
    res.status(200).json({ Status: false });
  }
};

exports.loginAdmin = async (req, res) => {
  const { usernameadmin, passwordadmin } = req.body;
  const result = await adminServices.servByUsernameAdminUpdate(usernameadmin);
  if (result != "") {
    const checkPassword = result[0]["passwordadmin"];
    const isMatch = await bcrypt.compare(passwordadmin, checkPassword);
    if (isMatch == true) {
      const token = await adminServices.servLoginAddmin(
        usernameadmin
      );
      if (!token) {
        res
          .status(200)
          .json({ msg: `ไม่พบแอดมิน username ${usernameadmin} ในระบบ` });
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

exports.addAdmin = async (req, res) => {
  const result = await adminServices.servByUsernameAndEmailAdmin(
    req.body.usernameadmin,
    req.body.emailadmin
  );
  if (result != "") {
    res
      .status(200)
      .json({
        msg: "username หรือ email ของท่านมีผู้อื่นใช้ไปแล้ว กรุณาใช้ username หรือ email อื่น",
        Status: false,
      });
  } else {
    const password = req.body.passwordadmin;
    const passwordHash = await securePassword(password);
    const newData = await adminServices.servAddAdmin(
      req.body,
      passwordHash,
      req.sub,
      req.shop_name
    );
    res
      .status(200)
      .json({ newData, msg: "เพิ่มข้อมูลแอดมินเรียบร้อยแล้ว", Status: true });
  }
};

exports.updateAdmin = async (req, res) => {
  const result = await adminServices.servByUsernameAdminUpdate(
    req.usernameadmin
  );
  if (result) {
    const checkPassword = result[0]["passwordadmin"];
    const password = req.body.passwordadmin;
    const newPassword = req.body.newpassword;
    const isMatch = await bcrypt.compare(password, checkPassword);
    if (isMatch == true){
      if(newPassword != ""){
        const salt = await securePassword(newPassword)
        passwordHash = salt;
      } else{
        passwordHash = checkPassword
      }
      const dataUpdate = await adminServices.servUpdateAdmin(
        req.body,
        passwordHash,
        req.usernameadmin
      );
      res
        .status(200)
        .json({
          msg: "อัพเดทข้อมูลแอดมินเรียบร้อยแล้ว",
          Status: true,
          dataUpdate,
        });
    } else {
      res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: false });
    }

  } else {
    res.status(200).json({ msg: "อัพเดทข้อมูลแอดมินไม่สำเร็จ", Status: false });
  }
};

exports.deleteAdmin = async (req, res) => {
  const result = await adminServices.servDeleteAdmin(req.sub, req.params.id);
  if (result) {
    res
      .status(200)
      .json({ msg: "ลบแอดมินออกจากระบบเรียบร้อยแล้ว", Status: true });
  } else {
    res.status(200).json({ msg: "ไม่พบข้อมูลแอดมินที่จะลบ", Status: false });
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
