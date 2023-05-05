const router = require('express').Router();
const sumProductController = require('../controllers/sumproduct.controller')



router.get('/sumproduct', sumProductController.getSumProductAll)

router.get('/sumproducttoday', sumProductController.getsumProductToday)

router.get('/sumproductyesterday', sumProductController.getsumProductYesterday)

router.post('/selectdate', sumProductController.getSumProductSelect)

router.post('/selectdatebetweenday', sumProductController.getSumProductSelectBetweenDay)

router.post('/addsumproduct', sumProductController.addSumProduct)

router.delete('/deletesumproduct/:id', sumProductController.deleteSumProduct)

module.exports = router