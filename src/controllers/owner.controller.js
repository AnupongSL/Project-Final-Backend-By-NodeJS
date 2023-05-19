const ownerServices = require('../services/owner.services')

exports.getOwner = async (req, res) => res.json(await ownerServices.servGetOwner());

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
    const result = await ownerServices.servUsernameOwner(req.username);
    if (result) {
      const dataUpdate = await ownerServices.servUpdateOwner(req.body, req.username)
      res.status(200).json({msg: "อัพเดทข้อมูลผู้จัดการเว็บเรียบร้อยแล้ว" , Status: true , dataUpdate});
    } else {
      res.status(200).json({msg: "อัพเดทข้อมูลผู้จัดการเว็บไม่สำเร็จ" , Status: false});
    }
  };
  