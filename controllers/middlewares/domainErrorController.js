const { JsonWebTokenError } = require('jsonwebtoken');

const domainErrorMap = {
  notFound: 404,
  alreadyRegistered: 409,
  invalidFields: 400,
};

module.exports = (err, _req, res, next) => {
  console.log('DomainErrroController: ', err);
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  const status = domainErrorMap[err.code];

  if (!status) return next(err);

  return res.status(status).json({ message: err.message });
};
