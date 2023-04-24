const router = require('express').Router();
const managerController = require('../controllers/manager.controller')
const auth = require('../middleware/middleware')

router.get('/getmanager', managerController.getManager)

router.get('/getmanager/:id', managerController.getManagerByID)

router.get('/getmanagerbyusername', managerController.getManagerByUsername)

router.get('/test',auth.authenthication, (req,res) => {
    console.log("Hello");
})

router.get('/login', managerController.Login)

router.post('/register', managerController.addManager)

router.put('/editmanager/:id', managerController.updateManager)

router.delete('/deletemanager/:id', managerController.deleteManager)

module.exports = router