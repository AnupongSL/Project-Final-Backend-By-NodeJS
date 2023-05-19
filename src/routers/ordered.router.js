const router = require('express').Router();
const orderController = require('../controllers/ordered.controller')

router.get('/getorderall', orderController.getOrderedAll) //เมนูทั้งหมดของร้าน 
router.get('/sumorderall', orderController.SumOrderedAll) // ยอดขายทั้งหมดของร้าน
router.post('/sumorderallbyusername', orderController.sumOrderedAllByUsername) // ยอดขายทั้งหมดของร้าน
router.get('/getorderbybill/:bill', orderController.getOrderedByBill) // เช็คข้อมูลตามเลขบิล
router.get('/getorderbytable/:table', orderController.getOrderedByTable) // เช็คข้อมูลตามโต๊ะ
router.post('/getorderbynamecustomer', orderController.getOrderedBynameCustomer) // เช็คข้อมูลตามชื่อลูกค้า
router.get('/getordertoday', orderController.getOrderedToday) //เมนูที่ขายวันนี้
router.get('/sumordertoday', orderController.SumOrderedToday) // จัดอันดับยอดขายวันนี้
router.get('/getorderyesterday', orderController.GetOrderedYesterday) //เมนูที่ขายเมื่อวาน
router.get('/sumorderyesterday', orderController.SumOrderedYesterday) // จัดอันดับยอดเมื่อวาน
router.get('/getorderweek', orderController.GetOrderedWeek) //เมนูที่ขายในสัปดาห์ที่ผ่านมา
router.get('/sumorderweek', orderController.SumOrderedWeek) // จัดอันดับยอดขายประจำสัปดาห์
router.get('/getordermonth', orderController.GetOrderedMonth) //เมนูที่ขายในเดือนที่ผ่านมา
router.get('/sumordermonth', orderController.SumOrderedMonth) //จัดอันดับยอดขายประจำเดือน
router.get('/getorderyear', orderController.GetOrderedYear) //เมนูที่ขายในปีที่ผ่านมา
router.get('/sumorderyear', orderController.SumOrderedYear) //จัดอันดับยอดขายประจำปี
router.get('/getorder2year', orderController.GetOrdered2Years) //เมนูที่ขายใน 2 ปีที่ผ่านมา
router.get('/sumorder2year', orderController.SumOrdered2Years) //จัดอันดับยอดขายประจำ 2 ปี
router.post('/getorderbyselect', orderController.GetOrderedBySelect) // เมนูที่ขายไป เลือกวัน
router.post('/sumorderbyselect', orderController.SumOrderedBySelect) // ยอดเมนูที่ขายไป เลือกวัน
router.post('/getorderbyselectbetweenday', orderController.GetOrderedBySelectBetweenDay) // เมนูที่ขายไป เลือกวัน...-...
router.post('/sumorderbyselectbetweenday', orderController.SumOrderedBySelectBetweenDay) // ยอดเมนูที่ขายไป เลือกวัน ...-...
router.post('/addorder', orderController.AddOrdered) //เพิ่มเมนูที่ลูกค้าสั่ง
router.delete('/deleteordered/:bill', orderController.DeleteOrdered) //ลบเมนูตามเลขบิล

module.exports = router