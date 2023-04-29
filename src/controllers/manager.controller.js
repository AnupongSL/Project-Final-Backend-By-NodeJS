const managerService = require("../services/manager.services");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.getManager = async (req, res) => res.json(await managerService.servAll());

exports.getManagerByID = async (req, res) => {
  const result = await managerService.servByID(req.params.id)
  if(result){
    res.json(result)
  } else {
    res.status(404).json({})
  }
};

exports.getManagerUsernameEmail = async (req, res) => {
  const result = await managerService.servUnEm(req.body.username, req.body.email)
  if(result){
    res.json(result)
  } else {
    res.status(200).json({msg: "ไม่พบข้อมูล"})
  }
}

exports.checkToken = async (req, res) => {
  res.json({Status : true, msg: 'Verified', username: req.sub})
  return true;
}

exports.loginManager = async (req, res) => {
  const  {username, password} = req.body
  const token = await managerService.servLogin(username, password)
  if(!token){
    res.status(401).json({msg:'ไม่พบผู้ใช้งานในระบบ'})
    return
  }
  res.json({token})
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
    res.json({msg: "แก้ไขข้อมูลเสร็จสิ้น" , Status: true});
  } else {
    res.status(200).json({msg: "ไม่พบข้อมูล" , Status: false});
  }
};

exports.deleteManager = async (req, res) => {
  const result = await managerService.servDelete(req.params.id)
  if (result) {
    res.status(204).json()
  } else {
    res.status(404).json({})
  }
};
