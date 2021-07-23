const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const credSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true
	},
}, { timestamps: true });
credSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this.user }, process.env.JWT_PRIVATE_KEY)
}
const Cred = model('Credentials', credSchema)

module.exports.Cred = Cred;