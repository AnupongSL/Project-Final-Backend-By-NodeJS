const router = require('express').Router();
const managerController = require('../controllers/manager.controller')
const jwt = require('../middleware/jwt')

router.get('/getmanager', managerController.getManager)

router.get('/getmanager/:id', managerController.getManagerByID)

router.get('/getmanagerbyusername', managerController.getManagerUsernameEmail)

router.get('/checktoken', jwt.verifyToken, managerController.checkToken);

router.post('/login', managerController.loginManager)

router.post('/register', managerController.addManager)

router.put('/editmanager',jwt.verifyToken, managerController.updateManager)

router.delete('/deletemanager/:id', managerController.deleteManager)

module.exports = router 