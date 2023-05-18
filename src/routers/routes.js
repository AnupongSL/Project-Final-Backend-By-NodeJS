const router = require('express').Router();
const jwt = require('../middleware/jwt')

router.use('/ordered', jwt.verifyToken, require('./ordered.router'))
router.use('/manager', require('./manager.route'))
router.use('/product',jwt.verifyToken, require('./product.route'))
router.use('/admin', require('./admin.route'))
router.use('/managerapp', require('./managerapp.route'))
router.use('/owner', require('./owner.route'))

module.exports = router 