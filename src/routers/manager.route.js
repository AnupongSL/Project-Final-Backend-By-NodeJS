const router = require('express').Router();
const managerController = require('../controllers/manager.controller')

router.get('', managerController.getManager)

router.get('/:id', managerController.getManagerByID)

router.post('', managerController.addManager)

router.put('/:id', managerController.updateManager)

router.delete('/:id', managerController.deleteManager)

module.exports = router