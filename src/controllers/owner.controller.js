const ownerServices = require('../services/owner.services')

exports.getOwnerAll = async (req, res) => res.json(await ownerServices.servGetOwnerAll());

exports.addOwner = async (req, res) => {
    const result = await ownerServices.servUsernameOwner(
      req.body.username
    );
    if (result != "") {
      res.status(200).json({msg:"username ถูกใช้งานไปแล้ว" , Status: false});
    } else {
      const newData = await ownerServices.servAddOwner(req.body)
      res
        .status(200)
        .json({newData, msg: "เพิ่มข้อมูลแอดมินเรียบร้อยแล้ว" , Status: true});
    }
  };

  exports.loginOwner = async (req, res) => {
    const  {username, password} = req.body
    const token = await ownerServices.servLoginOwner(username, password)
    if(!token){
      res.status(200).json({msg:`ไม่พบผู้ดูแลเว็บ username ${username} ในระบบ`})
      return
    }
    res.json({token})
  }

  exports.updateOwner = async (req, res) => {
    const result = await ownerServices.servOwnerByID(req.params.id);
    if (result) {
      const dataUpdate = await ownerServices.servUpdateOwner(req.body, req.params.id)
      res.status(200).json({msg: "อัพเดทข้อมูลผู้จัดการเว็บเรียบร้อยแล้ว" , Status: true , dataUpdate});
    } else {
      res.status(200).json({msg: "อัพเดทข้อมูลผู้จัดการเว็บไม่สำเร็จ" , Status: false});
    }
  };
  
  exports.deleteOwner = async (req, res) => {
    const result = await ownerServices.servDeleteOwner(req.params.id);
    if (result) {
      res.status(200).json({msg: 'ลบผู้จัดการเว็บออกจากระบบเรียบร้อยแล้ว', Status: true});
    } else {
      res.status(200).json({msg: 'ไม่พบข้อมูลผู้จัดการเว็บที่จะลบ', Status: false});
    }
  };