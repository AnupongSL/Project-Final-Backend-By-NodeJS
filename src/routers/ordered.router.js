const router = require('express').Router();
const orderController = require('../controllers/ordered.controller')

router.get('/getorderall', orderController.getOrderedAll)
router.get('/sumorderall', orderController.SumOrderedAll)
router.get('/getorderbybill/:bill', orderController.getOrderedByBill)
router.post('/getorderbynamecustomer', orderController.getOrderedBynameCustomer)
router.get('/getordertoday', orderController.getOrderedToday) //เมนูที่ขายวันนี้
router.get('/sumordertoday', orderController.SumOrderedToday) // จัดอันดับยอดขายประจำวัน
router.get('/getorderyesterday', orderController.GetOrderedYesterday) //เมนูที่ขายเมื่อวาน
router.get('/sumorderyesterday', orderController.SumOrderedYesterday) // จัดอันดับยอดขายประจำวันเมื่อวาน
router.get('/sumorderweek', orderController.SumOrderedWeek) // จัดอันดับยอดขายประจำสัปดาห์
router.get('/sumordermonth', orderController.SumOrderedMonth) //จัดอันดับยอดขายประจำเดือน
router.post('/getorderbyselect', orderController.GetOrderedBySelect) // เมนูที่ขายไป เลือกวัน
router.post('/sumorderbyselect', orderController.SumOrderedBySelect) // ยอดเมนูที่ขายไป เลือกวัน
router.post('/getorderbyselectbetweenday', orderController.GetOrderedBySelectBetweenDay) // เมนูที่ขายไป เลือกวัน...-...
router.post('/sumorderbyselectbetweenday', orderController.SumOrderedBySelectBetweenDay) // ยอดเมนูที่ขายไป เลือกวัน ...-...
router.post('/addorder', orderController.AddOrdered)
router.delete('/deleteordered/:bill', orderController.DeleteOrdered)


module.exports = router