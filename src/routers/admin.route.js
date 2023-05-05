const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.get('/getadmin', adminController.getAdminAll);
router.get('/getadmin/:id', adminController.getAdminByID);
router.get('/getadminbyname', adminController.getAdminByName);
// router.get('/getproduct', adminController.getProductByAddmin)
router.post('/registeradmin', adminController.addAdmin);
// router.post('/addproduct', adminController.addProductByAdmin)
router.put('/updateadmin/:id', adminController.updateAdmin);
router.delete('/deleteadmin/:id', adminController.deleteAdmin);

module.exports = router