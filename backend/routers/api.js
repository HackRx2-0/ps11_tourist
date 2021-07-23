const express = require('express')
const router = express.Router();

// routers
const users = require('./signup')
const auth = require('./login')
const message = require('./message')
const payment = require('./payment')
const prescription = require('./prescription')

router.use('/signup', users)
router.use('/login', auth)
router.use('/message', auth)
router.use('/prescription', prescription)
router.use('/payment', payment)
router.use('/message', message)

module.exports = router;