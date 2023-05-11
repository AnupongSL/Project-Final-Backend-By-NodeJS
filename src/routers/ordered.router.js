const router = require('express').Router();
const orderController = require('../controllers/ordered.controller')

router.get('/getorderall', orderController.getOrderedAll)
router.get('/sumorderall', orderController.SumOrderedAll)
router.get('/getorderbybill', orderController.getOrderedByBill)
router.get('/getorderbycustomer', orderController.getOrderedByCustomer)
router.get('/getordertoday', orderController.getOrderedToday)
router.get('/sumordertoday', orderController.SumOrderedToday)
router.get('/getorderyesterday', orderController.GetOrderedYesterday)
router.get('/sumorderyesterday', orderController.SumOrderedYesterday)
router.get('/sumorderweek', orderController.SumOrderedWeek)
router.get('/sumordermonth', orderController.SumOrderedMonth)
router.post('/getorderbyselect', orderController.GetOrderedBySelect)
router.post('/sumorderbyselect', orderController.SumOrderedBySelect)
router.post('/getorderbyselectbetweenday', orderController.GetOrderedBySelectBetweenDay)
router.post('/sumorderbyselectbetweenday', orderController.SumOrderedBySelectBetweenDay)
router.post('/addorder', orderController.AddOrdered)
router.delete('/deleteordered/:bill', orderController.DeleteOrdered)


module.exports = router