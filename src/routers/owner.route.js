const router = require('express').Router();
const ownerController = require('../controllers/owner.controller')
const jwt = require('../middleware/jwt')

router.get('/getowner', jwt.verifyToken, ownerController.getOwner) // ดึงข้อมูล เจ้าของระบบ
router.post('/loginowner', ownerController.loginOwner) // เข้าสู่ระบบโดย owner
router.put('/updateowner', jwt.verifyToken, ownerController.updateOwner) // แก้ไขข้อมูลเจ้าของระบบ

module.exports = router