const router = require('express').Router();
const managerController = require('../controllers/manager.controller')
const jwt = require('../middleware/jwt')

router.get('/getmanager', managerController.getManager) //ดึงข้อมูลเจ้าของร้านทั้งหมด
router.get('/getmanager/:id', managerController.getManagerByID) //ดึงข้อมูลเจ้าของร้านตามไอดีของเจ้าของร้าน
router.post('/getmanagerbyusername', managerController.getManagerUsername) // ดึงข้อมูลเจ้าของร้านตาม username
router.get('/getmanagerbyusernameemail', managerController.getManagerUsernameEmail) //ดึงข้อมูลเจ้าของร้านตาม username และ email
router.get('/checktoken', jwt.verifyToken, managerController.checkToken); // เช็คว่าล้อคอินไหม แล้วเช็คว่าคนที่ล้อคอินคือใคร owner, manager, admin
// router.get('/forget-password', managerController.forgetPasswordManager)
// router.post('/forget', managerController.forgetVerify)
router.post('/login', managerController.loginManager) // login เจ้าของร้าน
router.post('/register', managerController.addManager) // เพิ่มเจ้าของร้าน
router.put('/editmanager',jwt.verifyToken, managerController.updateManager) //แก้ไขเจ้าของร้าน
router.delete('/deletemanager/:id', managerController.deleteManager) // ลบเจ้าของร้านโดยไอดี

module.exports = router 