const express = require('express');
const { Payment } = require('../models/paymentModel');
const router = express.Router();
const Razorpay = require('razorpay')
const shortid = require('shortid')
const crypto = require('crypto')

// router.post('/', async (req, res) => {
// 	const paymentRes = new Prescription(req.body.data);
// 	paymentRes.save();
// 	res.json({ data: 'data' })
// })

module.exports = router

var instance = new Razorpay({
	key_id: 'rzp_test_efCADVgg8VMqeR',
	key_secret: 'fTKxtR7ZgMLx0eYPjyU6ASbg'
})

router.post('/', async (req, res) => {
	var { doctor_id, user_id, amount } = req.body
	try {
		// creating order
		const response = await instance.orders.create({
			amount: 5000 * 100,
			currency: 'INR',
			receipt: shortid.generate(),
			payment_capture: 1,
			notes: {
				from_patient: "60f70160ca50da1cf01352c6",
				to_doctor: '60f704fd0b30b70b1082fc0a'
			}
		})
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
		})
	}
	catch (error) {
		console.log(error);
	}
})

router.post('/verification', (req, res) => {
	// do a validation
	const secret = 'dsSfTTM55NHq6Jk' //  webhook secret key

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')
	// console.log(req.body.payload.payment.entity.notes)
	// console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		// request is legit
		// save in db
		var paymentData = {
			from_patient: req.body.payload.payment.entity.notes.from_patient,
			to_doctor: req.body.payload.payment.entity.notes.to_doctor,
			payment_id: req.body.payload.payment.entity.id,
			currency: req.body.payload.payment.entity.currency,
			amount: req.body.payload.payment.entity.amount,
		}
		const paymentRes = new Payment(paymentData)
		paymentRes.save()
		res.json({ status: 'ok' })
	} else {
		// request is not legit
		res.json({ error: 'Transaction not valid' })
	}
})