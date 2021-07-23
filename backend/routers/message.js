const express = require('express');
const { Message } = require('../models/msgModel');
const router = express.Router();

router.get('/', async (req, res) => {
	res.json({ data: 'data' })
})

module.exports = router