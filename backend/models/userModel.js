const { Schema, model } = require("mongoose");

const baseOptions = {
  discriminatorKey: '__type',
  collection: 'Users'
}
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false,
    enum: ['Male', 'Female', 'Prefer not to say']
  },
  dob: {
    type: Date,
    required: false,
  },
  phone_number: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10
  },

}, { timestamp: true }, baseOptions)
const User = model('User', userSchema)


// Customer schema
const customerSchema = new Schema({
  weight: {
    type: String,
  },
  height: {
    type: String
  }
})
const Customer = User.discriminator('Customer', customerSchema)


// Doctor schema
const doctorSchema = new Schema({
  specialisation: {
    type: String,
    // type: [String],
    // validate: {
    // 	validator: function (v) { return v.length > 0 },
    // 	message: 'There must be atleast one specialisation'
    // },
    required: false,
  },
  fees: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  experience: {
    type: Number,
    required: false
  },
  language: {
    type: [String],
    // validate: {
    // 	validator: function (v) { return v.length > 0 },
    // 	message: 'There must be atleast one language'
    // },
    required: false,
  },
  support_question: {
    type: [String],
    required: false
  }
})
const Doctor = User.discriminator('Doctor', doctorSchema);

module.exports.Customer = Customer;
module.exports.Doctor = Doctor;