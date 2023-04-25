const router = require('express').Router();
const jwt = require('../middleware/jwt')

router.use('/manager', require('./manager.route'))
// router.use('/product', require('./product.route'))
router.use('/admin',jwt.verifyToken, require('./admin.route'))

module.exports = router