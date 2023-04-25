const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/getproduct', productController.getProductAll);
router.get('/getproduct/:id', productController.getProductByID);
router.get('/getproductbyname', productController.getProductByName);
router.post('/register', productController.addProduct);
router.put('/updateproduct/:id', productController.updateProduct);
router.delete('/deleteproduct/:id', productController.deleteProduct);

module.exports = router