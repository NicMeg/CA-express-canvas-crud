const express = require('express')
const router = express.Router()
const { registerNew } = require('../controllers/auth_controller')

router.get('/register', registerNew)

module.exports = router;