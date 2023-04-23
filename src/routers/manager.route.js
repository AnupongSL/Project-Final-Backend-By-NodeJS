const router = require('express').Router();
const managerController = require('../controllers/manager.controller')

router.get('/getmanager', managerController.getManager)

router.get('/getmanager/:id', managerController.getManagerByID)

router.get('/getmanagerbyusername', managerController.getManagerByUsername)

router.post('/login', managerController.Login)

router.post('/register', managerController.addManager)

router.put('/editmanager/:id', managerController.updateManager)

router.delete('/deletemanager/:id', managerController.deleteManager)

module.exports = router