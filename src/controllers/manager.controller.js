const managerService = require("../services/manager.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const forget = require("../configs/forget");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

let myValue;
let roleToken;
let UsernameManager;
let passwordHash;

exports.getManager = async (req, res) =>
  res.json(await managerService.servAll());

exports.getManagerByID = async (req, res) => {
  const result = await managerService.servByID(req.params.id);
  if (result) {
    res.json({ msg: "พบผู้ใช้งาน", Status: true, result });
  } else {
    res.status(200).json({ msg: "ไม่พบผู้ใช้งาน", Status: false });
  }
};

exports.getManagerUsername = async (req, res) => {
  const result = await managerService.servUsername(req.body.username);
  if (result) {
    res.status(200).json({ msg: "พบข้อมูล", result });
  } else {
    res.status(200).json({ msg: "ไม่พบข้อมูล" });
  }
};

exports.usernameManager = async () => {
  return await UsernameManager
}

exports.getManagerByOwner = async (req, res) => {
  const result = await managerService.servUsername(req.body.username);
  UsernameManager = result[0]["username"]
  if (result) {
    res.status(200).json({ msg: `ชื่อเจ้าของร้าน: ${UsernameManager}`});
  } else {
    res.status(200).json({ msg: "ไม่พบข้อมูล" });
  }
};

exports.getManagerUsernameEmail = async (req, res) => {
  const result = await managerService.servUnEm(
    req.body.username,
    req.body.email
  );
  if (result) {
    res.json(result);
  } else {
    res.status(200).json({ msg: "ไม่พบข้อมูล" });
  }
};

exports.checkToken = async (req, res) => {
  if (req.role === "manager") {
    res.json({
      Status: true,
      msg: "Verified",
      username: req.sub,
      role: req.role,
    });
  } else if (req.role === "admin") {
    res.json({
      Status: true,
      msg: "Verified",
      username: req.usernameadmin,
      role: req.role,
    });
  } else {
    res.json({
      Status: true,
      msg: "Verified",
      UsernameManager: UsernameManager,
      username: req.username,
      role: req.role,
    });
  }

  return true;
};

exports.loginManager = async (req, res) => {
  const { username, password } = req.body;
  const result = await managerService.servUsername(username);
  if (result != "") {
    const checkPassword = result[0]["password"];
    const isMatch = await bcrypt.compare(password, checkPassword);
    if (isMatch == true) {
      const token = await managerService.servLogin(username);
      if (!token) {
        res.status(200).json({ msg: "ไม่พบผู้ใช้งานในระบบ" });
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
exports.forgetVerify = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await managerService.servByEmail(email);
    if (userData != undefined) {
      const randomString = randomstring.generate();
      roleToken = userData[0]["role"];
      if (roleToken == "manager") {
        name = userData[0]["name"];
      } else if (roleToken == "admin") {
        name = userData[0]["nameadmin"];
      } else if (roleToken == "owner") {
        name = userData[0]["namemanagerapp"];
      }
      const emailValue = await managerService.servupdateToken(
        email,
        randomString,
        roleToken
      );
      if (emailValue != "") {
        myValue = randomString;
        forgetPassword(name, email, randomString, res);
      } else {
        res
          .status(200)
          .json({ message: "อีเมลของผู้ใช้ไม่ถูกต้อง", Status: false });
      }
    } else {
      res
        .status(200)
        .json({ message: "ไม่พบอีเมลของท่านในระบบ", Status: false });
    }
  } catch (error) {
    // console.log(error.massage);
  }
};

exports.resetPassword = async (req, res) => {
  const password = req.body.password;
  const password2 = req.body.password2;
  if (password == password2) {
    const secure_password = await securePassword(password);
    const resetPW = await managerService.servResetPassword(
      myValue,
      secure_password,
      roleToken
    );
    if (resetPW) {
      res.status(200).json({ msg: "แก้ไขรหัสผ่านเรียบร้อยแล้ว", Status: true });
    } else {
      res.status(200).json({ msg: "แก้ไขรหัสผ่านไม่สำเร็จ", Status: false });
    }
  }
};

exports.addManager = async (req, res) => {
  const result = await managerService.servUnEm(
    req.body.username,
    req.body.email
  );
  if (result != "") {
    res.status(200).json({
      msg: "username หรือ email ของท่านมีผู้อื่นใช้ไปแล้ว กรุณาใช้ username หรือ email อื่น",
      Status: false,
    });
  } else {
    const password = req.body.password;
    const passwordHash = await securePassword(password);
    const dataAdd = await managerService.servAdd(req.body, passwordHash);
    res.status(200).json({ msg: "เพิ่มผู้ใช้งานแล้ว", Status: true, dataAdd });
  }
};

exports.updateManager = async (req, res) => {
  const result = await managerService.servUsername(req.sub);
  if (result) {
    const checkPassword = result[0]["password"];
    const password = req.body.password;
    const newPassword = req.body.newpassword;
    const isMatch = await bcrypt.compare(password, checkPassword);
    if (isMatch == true) {
      if(newPassword != ""){
        const salt = await securePassword(newPassword)
        passwordHash = salt;
      } else{
        passwordHash = checkPassword
      }
      const updated = await managerService.servUpdate(
        req.sub,
        passwordHash,
        req.body
      );
      if (updated) {
        res.status(200).json({ msg: "แก้ไขข้อมูลเสร็จสิ้น", Status: true, updated });
      } else {
        res.status(200).json({ msg: "ไม่พบข้อมูล", Status: false });
      }
    } else {
      res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: false });
    }
  } else {
    res.status(200).json({ msg: "อัพเดทข้อมูลแอดมินไม่สำเร็จ", Status: false });
  }
};

exports.deleteManager = async (req, res) => {
  const result = await managerService.servDelete(req.params.id);
  if (result) {
    res.status(200).json({ msg: "ลบข้อมูลสำเร็จ", Status: true });
  } else {
    res.status(200).json({ msg: "ไม่พบข้อมูล", Status: false });
  }
};

const forgetPassword = async (name, email, token, res) => {
  let config = {
    service: "gmail",
    auth: {
      user: forget.EMAIL,
      pass: forget.PASSWORD,
    },
  };
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: name,
      intro:
        '<p>Please click here to <a href="http://localhost:3000/forgetpassword/' +
        token +
        '"> Reset </a> your password.</a></p>',
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mail = MailGenerator.generate(response);

  let message = {
    from: forget.EMAIL,
    to: email,
    subject: "Reset Password!!!",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      res.status(201).json({ error });
    });
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};


