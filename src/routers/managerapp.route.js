const router = require('express').Router();
const managerAppController = require('../controllers/manager.controller')

router.get('/getmanagerapp', managerAppController.getManager)

router.get('/getmanagerapp/:id', managerAppController.getManagerByID)

router.get('/getmanagerappbyusername', managerAppController.getManagerUsername)

router.put('/editmanagerapp/:id', managerAppController.updateByManagerApp)

router.delete('/deletemanagerapp/:id', managerAppController.deleteManager)

module.exports = router