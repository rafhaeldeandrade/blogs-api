const joi = require('joi');

const categorySchema = joi.object({
  name: joi.string().required(),
});

const validateCategorySchema = (body) => {
  const result = categorySchema.validate(body);

  if (result.error) throw result.error;

  return true;
};

module.exports = validateCategorySchema;
