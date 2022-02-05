const joi = require('joi');

const tokenSchema = joi.object({
  token: joi.string().required().messages({
    'any.required': 'Token not found',
    'string.min': 'Token not found',
    'string.empty': 'Token not found',
  }),
});

const validateTokenSchema = (body) => {
  const result = tokenSchema.validate(body);

  if (result.error) throw result.error;

  return true;
};

module.exports = validateTokenSchema;
