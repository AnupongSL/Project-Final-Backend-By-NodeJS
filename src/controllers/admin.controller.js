const adminServices = require("../services/admin.services");
const jwt = require("jsonwebtoken");

exports.getAdminAll = async (req, res) => res.json(await adminServices.servAdminAll(req.sub));

exports.getAdminByID = async (req, res) => {
  const result = await adminServices.servByID(req.sub, req.params.id);
  if (result !== '') {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.getAdminByName = async (req, res) => {
  const result = await adminServices.servByName(req.sub, req.body.nameadmin);
  if (result !== '') {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.addAdmin = async (req, res) => {
  const result = await adminServices.servByUsernameAdmin(
    req.sub,
    req.body.usernameadmin
  );
  if (result != "") {
    res.status(500).json("username ถูกใช้งานไปแล้ว");
  } else {
    res
      .status(201)
      .json(await adminServices.servAddAdmin(req.body, req.sub));
  }
};
exports.updateAdmin = async (req, res) => {
  const result = await adminServices.servByID(req.sub, req.params.id);
  if (result) {
    res.status(201).json(await adminServices.servUpdateAdmin(req.body, req.sub, req.params.id));
  } else {
    res.status(404).json({});
  }
};

exports.deleteAdmin = async (req, res) => {
  const result = await adminServices.servDeleteAdmin(req.sub, req.params.id);
  if (result) {
    res.status(204).json('ลบแอดมินออกจากระบบเรียบร้อยแล้ว');
  } else {
    res.status(404).json({});
  }
};
