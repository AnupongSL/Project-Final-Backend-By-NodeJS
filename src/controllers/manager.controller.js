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
    res.status(404).json({})
  }
}

exports.checkToken = async (req, res) =>  {
  res.json("The token is vailable.");
  return true;
}
exports.loginManager = async (req, res) => {
  const  {username,  password} = req.body
  const token = await managerService.servLogin(username, password)
  if(!token){
    res.status(401).json()
    return
  }
  res.json({token})
}

exports.addManager = async (req, res) => {
  const result = await managerService.servUnEm(req.body.username, req.body.email)
  if(result != ''){
    res.status(500).json("username หรือ email ของท่านมีผู้อื่นใช้ไปแล้ว กรุณาใช้ username หรือ email อื่น");
  } else {
  res.status(201).json(await managerService.servAdd(req.body));
 }
};
exports.updateManager = async (req, res) => {
  const result = await managerService.servUpdate(req.sub, req.body);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({});
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
