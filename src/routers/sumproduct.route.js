const router = require('express').Router();
const sumProductController = require('../controllers/sumproduct.controller')



router.get('/sumproduct', sumProductController.getSumProductAll)

router.get('/getproducttoday', sumProductController.get1sumProductToday)
router.get('/sumproducttoday', sumProductController.getsumProductToday)

router.get('/getproductyesterday', sumProductController.get1sumProductYesterday)
router.get('/sumproductyesterday', sumProductController.getsumProductYesterday)

router.post('/getselectdate', sumProductController.get1SumProductSelect)
router.post('/selectdate', sumProductController.getSumProductSelect)

router.post('/getselectdatebetweenday', sumProductController.get1SumProductSelectBetweenDay)
router.post('/selectdatebetweenday', sumProductController.getSumProductSelectBetweenDay)

router.post('/addsumproduct', sumProductController.addSumProduct)

router.delete('/deletesumproduct/:id', sumProductController.deleteSumProduct)

module.exports = router