const joi = require('joi');

const editPostSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

const validateEditPostSchema = (body) => {
  const result = editPostSchema.validate(body);

  if (result.error) throw result.error;

  return true;
};

module.exports = validateEditPostSchema;
