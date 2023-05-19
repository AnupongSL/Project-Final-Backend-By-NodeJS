const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/getproduct', productController.getProductAll); //ดึงข้อมูลสินค้าทั้งหมดในร้าน
router.get('/getproduct/:id', productController.getProductByID); // ดึงข้อมูลสินค้าตามไอดีของสินค้า
router.get('/getproductbyname', productController.getProductByName); // ดึงข้อมูลสินค้าตามชื่อของสินค้า
router.post('/register', productController.addProduct); //เพิ่มสินค้า
router.put('/updateproduct/:id', productController.updateProduct); //แก้ไขสินค้าตามไอดีของสินค้า
router.delete('/deleteproduct/:id', productController.deleteProduct); //ลบสินค้าตามไอดีของสินค้า

module.exports = router