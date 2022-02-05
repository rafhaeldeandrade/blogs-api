const joi = require('joi');

const registerUserSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required().messages({
    'string.email': '{#label} must be a valid email',
  }),
  password: joi.string().length(6).required(),
  image: joi.string().required(),
});

const validateRegisterUser = (body) => {
  const result = registerUserSchema.validate(body);

  if (result.error) throw result.error;

  return true;
};

module.exports = validateRegisterUser;
