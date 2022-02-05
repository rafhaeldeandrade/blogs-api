const joi = require('joi');

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
});

const validatePostSchema = (body) => {
  const result = postSchema.validate(body);

  if (result.error) throw result.error;

  return true;
};

module.exports = validatePostSchema;
