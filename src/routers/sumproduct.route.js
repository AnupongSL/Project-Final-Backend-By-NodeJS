const router = require('express').Router();
const sumProductController = require('../controllers/sumproduct.controller')



router.get('/sumproduct', sumProductController.getSumProductAll) //get เมนูทั้งหมดของร้านตั้งแต่วันแรกจนล่าสุดว่าขายอะไรไปบ้าง
router.get('/sumproductall', sumProductController.SumProductAll) //ยอดขายตั้งแต่วันแรกจนถึงปัจจุบัน

router.get('/getproducttoday', sumProductController.get1sumProductToday) //get เมนูที่ขายในวันนี้
router.get('/sumproducttoday', sumProductController.getsumProductToday) //get ยอดขายที่ขายในวันนี้

router.get('/getproductyesterday', sumProductController.get1sumProductYesterday)
router.get('/sumproductyesterday', sumProductController.getsumProductYesterday)

router.post('/getselectdate', sumProductController.get1SumProductSelect) //get รายการสินค้าที่ขายในวันที่เลือก
router.post('/selectdate', sumProductController.getSumProductSelect) //get ยอดขายสินค้าในวันที่เลือก

router.post('/getselectdatebetweenday', sumProductController.get1SumProductSelectBetweenDay) //เลือกวันที่ตั้งแต่ วันที่... - ...
router.post('/selectdatebetweenday', sumProductController.getSumProductSelectBetweenDay)

router.post('/addsumproduct', sumProductController.addSumProduct) //แอดมินกดเพิ่มสินค้า

router.delete('/deletesumproduct/:id', sumProductController.deleteSumProduct) //ลบเมนูที่สั่งเมื่อสั่งผิด

module.exports = router