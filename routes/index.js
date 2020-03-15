const express = require('express')
const router = express.Router()
const controller = require('./controllers/')

router.post('/login', controller.login)
router.get('/getUser', controller.auth, controller.getUser)

module.exports = router
