const Joi = require("joi");
const joiPwd = require("joi-password-complexity");

//user schema
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30).required(),
  // lastName: Joi.string().min(3).max(100),
//   mobile: Joi.string().min(11).max(12),
//   studentId: Joi.number().min(1).required(),
//   isMarried: Joi.boolean().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30).required(),
});

//doctor schema
const doctorSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().required(),
  // password: Joi.string().min(5).max(30).required()
  medicalLicense: Joi.string().min(3).max(100).required(),
  phone: Joi.string().min(11).max(12).required(),
  // email: Joi.string().email().required(),
  // lastName: Joi.string().min(3).max(100),
//   mobile: Joi.string().min(11).max(12),
//   studentId: Joi.number().min(1).required(),
//   isMarried: Joi.boolean().required()
});
//user schema
const nurseSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).max(12).required()
  // lastName: Joi.string().min(3).max(100),
//   mobile: Joi.string().min(11).max(12),
//   studentId: Joi.number().min(1).required(),
//   isMarried: Joi.boolean().required()
});


//password complexity
const complexityOptions = {
  min: 5,
  max: 30,
  lowercase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

// module.exports.userVal = userSchema;
module.exports.doctorVal = doctorSchema;
module.exports.nurseVal = nurseSchema;
module.exports.userVal = userSchema;
module.exports.loginVal = loginSchema;
module.exports.pwdVal = joiPwd(complexityOptions);