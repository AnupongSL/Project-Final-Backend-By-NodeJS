const managerService = require("../services/manager.services");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
  const result = await managerService.findManagerByUsername_password(req.body.username, req.body.password);
  if (result) {
    const myArray = result;
    const passwordA = myArray[0]["password"];
    const isMatch = await bcrypt.compare(req.body.password, passwordA);
    if (!isMatch) {
      return res.status(400).send("Password Invalid!!")
    }
    const payload = {
      result: {
        username: req.body.username,
        password: req.body.password,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if(err) throw err;
      res.json({token, payload})
    });
  }
  else{
    res.status(400).json("User Not found!!")
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
