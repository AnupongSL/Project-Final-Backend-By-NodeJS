const router = require('express').Router();
const ownerController = require('../controllers/owner.controller')
const jwt = require('../middleware/jwt')

router.get('/getownerall', jwt.verifyToken, ownerController.getOwnerAll)
router.post('/addowner', jwt.verifyToken, ownerController.addOwner)
router.post('/loginowner', ownerController.loginOwner)
router.put('/updateowner/:id', jwt.verifyToken, ownerController.updateOwner)
router.delete('/deleteowner/:id', jwt.verifyToken, ownerController.deleteOwner)

module.exports = router