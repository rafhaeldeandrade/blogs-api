const domainErrorMap = {
  notFound: 404,
  alreadyRegistered: 409,
  invalidFields: 400,
};

module.exports = (err, _req, res, next) => {
  const status = domainErrorMap[err.code];

  if (!status) return next(err);

  return res.status(status).json({ message: err.message });
};
