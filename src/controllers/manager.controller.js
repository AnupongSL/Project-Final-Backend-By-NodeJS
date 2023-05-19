const managerService = require("../services/manager.services");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const randomstring = require("randomstring");
const forget = require('../configs/forget');
const nodemailer = require("nodemailer");

exports.getManager = async (req, res) => res.json(await managerService.servAll());

exports.getManagerByID = async (req, res) => {
  const result = await managerService.servByID(req.params.id)
  if(result){
    res.json({msg: "พบผู้ใช้งาน", Status: true, result})
  } else {
    res.status(200).json({msg: "ไม่พบผู้ใช้งาน", Status: false})
  }
};

exports.getManagerUsername = async (req, res) => {
  const result = await managerService.servUsername(req.body.username)
  if(result){
    res.status(200).json({msg: "พบข้อมูล" , result})
  } else {
    res.status(200).json({msg: "ไม่พบข้อมูล"})
  }
}

exports.getManagerUsernameEmail = async (req, res) => {
  const result = await managerService.servUnEm(req.body.username, req.body.email)
  if(result){
    res.json(result)
  } else {
    res.status(200).json({msg: "ไม่พบข้อมูล"})
  }
}

exports.checkToken = async (req, res) => {
  if (req.role === "manager") {
    res.json({Status : true, msg: 'Verified', username: req.sub , role: req.role})
  }else if(req.role === "admin") {
    res.json({Status : true, msg: 'Verified', username: req.usernameadmin, role: req.role})
  }else {
    res.json({Status : true, msg: 'Verified', username: req.sub, role: req.role})
  }
  
  return true;
}

exports.loginManager = async (req, res) => {
  const  {username, password} = req.body
  const token = await managerService.servLogin(username, password)
  if(!token){
    res.status(200).json({msg:'ไม่พบผู้ใช้งานในระบบ'})
    return
  }
  res.json({token})
}

exports.forgetPasswordManager = async (req, res) => {
  try {
    res.render('forget')
  } catch (error) {
    console.log(error.massage);
  }
}

exports.forgetVerify = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await managerService.servByEmail(email)
    if(userData){
      const randomString = randomstring.generate();
      //console.log("ขั้นที่ 1", email)
      await managerService.servupdateToken(email, randomString)
      //console.log("ขั้นที่ 2", updateData)
      name = userData[0]["name"]
      res.json(userData)
      sendResetPasswordMail(name, email, randomString)
      // res.send('forget',{message: "Please check your mail to reset your password"});
    } else {
      res.render('forget', {message:"User email is incorrect."})
    }
  } catch (error) {
    console.log(error.massage);
  }
}

const sendResetPasswordMail = async(name, email, token) =>{
  console.log(name, email, token);
  console.log(forget.emailUser);
  console.log(forget.emailPassword);
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: forget.emailUser, // generated ethereal user
      pass: forget.emailPassword // generated ethereal password
    },
  });
  const mailOptions = {
    from: forget.emailUser,
    to:email,
    subject: 'For Reset Password',
    html: '<p>Hi '+name+', please click here to <a href="http://127.0.0.1:3000/forget-password?token='+token+'"> Reset </a> your password.</a></p>'
  }
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }
    else {
      console.log("Email has been sent:- ",info.response);
    }
  })
}

exports.addManager = async (req, res) => {
  const result = await managerService.servUnEm(req.body.username, req.body.email)
  if(result != ''){
    res.status(200).json({msg: "username หรือ email ของท่านมีผู้อื่นใช้ไปแล้ว กรุณาใช้ username หรือ email อื่น" , Status: false});
  } else {
    const dataAdd =  await managerService.servAdd(req.body)
    res.status(200).json({msg: "เพิ่มผู้ใช้งานแล้ว",Status: true , dataAdd});
 }
};

exports.updateManager = async (req, res) => {
  const result = await managerService.servUpdate(req.sub, req.body);
  if (result) {
    res.status(200).json({msg: "แก้ไขข้อมูลเสร็จสิ้น" , Status: true});
  } else {
    res.status(200).json({msg: "ไม่พบข้อมูล" , Status: false});
  }
};

exports.deleteManager = async (req, res) => {
  const result = await managerService.servDelete(req.params.id)
  if (result) {
    res.status(200).json({msg: "ลบข้อมูลสำเร็จ" , Status: true})
  } else {
    res.status(200).json({msg: "ไม่พบข้อมูล" , Status: false})
  }
};
