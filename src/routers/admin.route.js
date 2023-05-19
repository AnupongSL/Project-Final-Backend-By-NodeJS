const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const jwt = require('../middleware/jwt')

router.get('/getadmin',jwt.verifyToken, adminController.getAdminAll);
router.get('/getadmin/:id',jwt.verifyToken, adminController.getAdminByID);
router.get('/getadminbyname',jwt.verifyToken, adminController.getAdminByName);
router.post('/getadminbyusername',jwt.verifyToken, adminController.getAdminByUsername);
router.post('/loginadmin', adminController.loginAdmin); 
// router.get('/getproduct', adminController.getProductByAddmin)
router.post('/registeradmin',jwt.verifyToken, adminController.addAdmin);
// router.post('/addproduct', adminController.addProductByAdmin)
router.put('/updateadmin/:id',jwt.verifyToken, adminController.updateAdmin);
router.delete('/deleteadmin/:id',jwt.verifyToken, adminController.deleteAdmin);

module.exports = router