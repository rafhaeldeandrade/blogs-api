const joi = require('joi');

const loginUserSchema = joi.object({
  email: joi.string().email().min(1).required()
  .messages({
    'string.email': '{#label} must be a valid email',
    'string.min': '{#label} is not allowed to be empty',
  }),
  password: joi.string().min(1).length(6).required()
  .messages({
    'string.min': '{#label} is not allowed to be empty',
  }),
});

const validateLoginUserSchema = (body) => {
  const result = loginUserSchema.validate(body);

  if (result.error) throw result.error;

  return true;
};

module.exports = validateLoginUserSchema;
