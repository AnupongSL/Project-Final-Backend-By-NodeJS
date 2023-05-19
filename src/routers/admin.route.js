const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const jwt = require('../middleware/jwt')

router.get('/getadmin',jwt.verifyToken, adminController.getAdminAll); // ดึงข้อมูลแอดมินทั้งหมดโดยเจ้าของร้าน
router.get('/getadmin/:id',jwt.verifyToken, adminController.getAdminByID); //ดึงข้อมูลแอดมินตามไอดี
router.get('/getadminbyname',jwt.verifyToken, adminController.getAdminByName); //ดึงข้อมูลแอดมินตามชื่อ
router.post('/getadminbyusername',jwt.verifyToken, adminController.getAdminByUsername); //ดึงข้อมูลแอดมินตาม username
router.post('/loginadmin', adminController.loginAdmin); //หน้า login ของแอดมิน
router.post('/registeradmin',jwt.verifyToken, adminController.addAdmin); // เพิ่มแอดมิน
router.put('/updateadmin',jwt.verifyToken, adminController.updateAdmin); // แก้ไขข้อมูลแอดมิน
router.delete('/deleteadmin/:id',jwt.verifyToken, adminController.deleteAdmin); // หน้าลบแอดมินตามไอดี

module.exports = router