const express = require('express');
// const _ = require('lodash');
const bcrypt = require('bcrypt')
const { Cred } = require('../models/credModel');
const Joi = require('joi')
const router = express.Router();

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	})
	return schema.validate(req)
}

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message)

	let user = await Cred.findOne({ email: req.body.email })
	if (!user) return res.status(400).send('Email or password is invalid')

	const pass = await bcrypt.compare(req.body.password, user.password)
	if (!pass) return res.status(400).send('Email or password is invalid')

	const token = user.generateAuthToken()
	res.json({jwt:token, name: `${user.first_name} ${user.second_name}`, type:user.__t, email: user.email })
})

module.exports = router