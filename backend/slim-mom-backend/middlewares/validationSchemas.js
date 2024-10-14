const Joi = require("joi").extend(require("@joi/date"));




const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string(),
  currentWeight: Joi.number(),
  height: Joi.number(),
  age: Joi.number(),
  desiredWeight: Joi.number(),
  bloodType: Joi.number(),
  dailyRate: Joi.number(),
  
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(), 
  password: Joi.string().min(6).required(),
});



module.exports = {
  joiSignupSchema,
  joiLoginSchema,
 
};
