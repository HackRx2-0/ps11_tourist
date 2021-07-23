const { Schema, model } = require('mongoose')
const prescriptionSchema = new Schema({
	from_doctor: {
		type: Schema.Types.ObjectId,
		required: true
	},
	to_patient: {
		type: Schema.Types.ObjectId,
		required: true
	},
	medicine_name: {
		type: String,
	},
	frequency: {
		type: [Number],
	},
	duration: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
}, { timestamps: true })
const Prescription = model('Prescription', prescriptionSchema)

module.exports.Prescription = Prescription