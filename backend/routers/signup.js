const express = require('express');
const bcrypt = require('bcrypt')
const { Customer, Doctor } = require('../models/userModel');
const { Cred } = require('../models/credModel');
const router = express.Router();
const Joi = require('joi')

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  })
  return schema.validate(req)
}

function validateUser(req) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Prefer not to say'),
    dob: Joi.date(),
    phone_number: Joi.string().min(10).max(10).required(),
    account_created: Joi.date()
  })
  return schema.validate(req)
}

function validateDoctor(req) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().min(10).max(10).required(),
    specialisation: Joi.string(),
    fees: Joi.number(),
    // gender: Joi.string().valid('Male', 'Female', 'Prefer not to say').required(),
    // dob: Joi.date().required(),
    // account_created: Joi.date(),
    // experience: Joi.number().required(),
    // photo: Joi.string(),
    // language: Joi.array(),
  })
  return schema.validate(req)
}


router.post('/customer', async (req, res) => {
  // validate credentials
  try {
    const credentialsRes = validate(req.body.credentials);
    if (credentialsRes.error) {
      console.log(credentialsRes.error.details[0].message)
      return res.status(400).send(credentialsRes.error.details[0].message)
    }

    // check if user already exist
    let user = await Cred.findOne({ email: req.body.credentials.email })
    if (user) return res.status(400).send('User already exist')

    // validate user details
    const userRes = validateUser(req.body.data);
    if (userRes.error) return res.status(400).send(userRes.error.details[0].message)

    // if above things worked well we can creste user
    let userData = await Customer.create(req.body.data)
    // create password salt
    user = new Cred(req.body.credentials)
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.user = userData._id
    // save the user
    await user.save();

    const token = user.generateAuthToken()
    res.json({
      jwt: token,
      name: `${userData.first_name} ${userData.last_name}`,
      type: userData.__t,
      email: user.email
    })
  } catch (err) {
    console.error('gu', err)
  }

})

router.post('/doctor', async (req, res) => {
  // validate credentials
  try {
    const credentialsRes = validate(req.body.credentials);
    if (credentialsRes.error) return res.status(400).send(credentialsRes.error.details[0].message)

    // check if user already exist
    let user = await Cred.findOne({ email: req.body.credentials.email })
    if (user) return res.status(400).send('User already exist')

    // validate doctor details
    const doctorRes = validateDoctor(req.body.data);
    if (doctorRes.error) return res.status(400).send(doctorRes.error.details[0].message)

    let doctorData = await Doctor.create(req.body.data)
    // create password salt
    user = new Cred(req.body.credentials)
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.user = doctorData._id
    // save user
    await user.save();

    const token = user.generateAuthToken()
    res.send({
      jwt: token,
      name: `${doctorData.first_name} ${doctorData.second_name}`,
      type: doctorData.__t,
      email: user.email
    })
  } catch (err) {
    console.error(err)
  }

})

module.exports = router