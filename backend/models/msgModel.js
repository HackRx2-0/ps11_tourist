const { Schema, model } = require('mongoose')
const messageSchema = new Schema({
	from: {
		type: Schema.Types.ObjectId,
		required: true
	},
	to: {
		type: Schema.Types.ObjectId,
		required: true
	},
	message_content: {
		type: String,
		minLength: 1,
		required: true
	},
	message_type: {
		type: String,
		required: true
	}
}, { timestamps: true })
const Message = model('Message', messageSchema)

module.exports.Message = Message