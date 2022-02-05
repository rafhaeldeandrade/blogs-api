const joi = require('joi');

const joiErrorMap = {
  'string.min': 400,
  'any.required': 400,
  'string.email': 400,
  'string.length': 400,
  'string.empty': 400,
};

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) return next(err);

  const status = joiErrorMap[err.details[0].type];

  if (!status) next(err);

  res.status(status).json({ message: err.message });
};
