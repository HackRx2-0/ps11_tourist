const { Schema, model } = require('mongoose')

const paymentSchema = new Schema({
	from_patient: {
		type: Schema.Types.ObjectId,
		required: true
	},
	to_doctor: {
		type: Schema.Types.ObjectId,
		required: true
	},
	payment_id: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	amount: {
		type: Number
	}
}, { timestamps: true })
const Payment = model('Payment', paymentSchema)

module.exports.Payment = Payment