const managerService = require("../services/manager.services");

exports.getManager = async (req, res) => res.json(await managerService.findManagerAll());

exports.getManagerByID = async (req, res) => {
  const result = await managerService.findManagerByID(req.params.id)
  if(result){
    res.json(result)
  } else {
    res.status(404).json({})
  }
};

exports.getManagerByUsername = async (req, res) => {
  const result = await managerService.findManagerByUsername(req.body.username, req.body.email)
  if(result){
    res.json(result)
  } else {
    res.status(404).json({})
  }
}

exports.Login = async (req, res) => {
  const result = await managerService.findManagerByUsername_password(req.body.username, req.body.password)
  if(result != ''){
    res.json("เข้าสู่ระบบเรียบร้อยแล้ว")
  } else {
    res.status(404).json("username หรือ password ของท่านไม่ถูกต้อง")
  }
}

exports.addManager = async (req, res) => {
  const result = await managerService.findManagerByUsername(req.body.username, req.body.email)
  if(result != ''){
    res.status(500).json("username หรือ email ของท่านมีผู้อื่นใช้ไปแล้ว กรุณาใช้ username หรือ email อื่น");
  } else {
  res.status(201).json(await managerService.findAddManager(req.body));
 }
};
exports.updateManager = async (req, res) => {
  const result = await managerService.findUpdateManager(req.params.id, req.body);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.deleteManager = async (req, res) => {
  const result = await managerService.findDeleteManager(req.params.id)
  if (result) {
    res.status(204).json()
  } else {
    res.status(404).json({})
  }
};
