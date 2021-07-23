const express = require('express');
const { Prescription } = require('../models/prescriptionModel');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('./../utils')

const JWT_PRIVATE_KEY = config.app.JWT_PRIVATE_KEY

router.post('/', async (req, res) => {
	const prescriptionRes = new Prescription(req.body);
	prescriptionRes.save();
	res.json({ data: 'data' })
})

router.get('/', async (req, res) => {
	const token = req.query.token;
	const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
	var patient_id = decoded._id
	const patient_prescription = await Prescription.find({ to_patient: patient_id })
	console.log({ 'res': patient_prescription })
	res.json({ 'res': patient_prescription })
})

module.exports = router