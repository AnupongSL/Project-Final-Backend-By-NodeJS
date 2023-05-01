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
    res.status(200).json({msg:"username ถูกใช้งานไปแล้ว" , Status: false});
  } else {
    const newData = await adminServices.servAddAdmin(req.body, req.sub)
    res
      .status(200)
      .json({newData, msg: "เพิ่มข้อมูลแอดมินเรียบร้อยแล้ว" , Status: true});
  }
};
exports.updateAdmin = async (req, res) => {
  const result = await adminServices.servByID(req.sub, req.params.id);
  if (result) {
    const dataUpdate = await adminServices.servUpdateAdmin(req.body, req.sub, req.params.id)
    res.status(200).json({msg: "อัพเดทข้อมูลแอดมินเรียบร้อยแล้ว" , Status: true , dataUpdate});
  } else {
    res.status(200).json({msg: "อัพเดทข้อมูลแอดมินไม่สำเร็จ" , Status: false});
  }
};

exports.deleteAdmin = async (req, res) => {
  const result = await adminServices.servDeleteAdmin(req.sub, req.params.id);
  if (result) {
    res.status(200).json({msg: 'ลบแอดมินออกจากระบบเรียบร้อยแล้ว', Status: true});
  } else {
    res.status(200).json({msg: 'ไม่พบข้อมูลแอดมินที่จะลบ', Status: false});
  }
};
