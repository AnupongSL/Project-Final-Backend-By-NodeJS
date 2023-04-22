const router = require('express').Router();

router.use('/manager', require('./manager.route'))

module.exports = router