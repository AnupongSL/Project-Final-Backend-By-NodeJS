const router = require('express').Router();
const jwt = require('../middleware/jwt')

router.use('/manager', require('./manager.route'))
router.use('/product',jwt.verifyToken, require('./product.route'))
router.use('/admin',jwt.verifyToken, require('./admin.route'))
router.use('/managerapp', require('./managerapp.route'))

module.exports = router 