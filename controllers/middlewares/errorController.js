module.exports = (err, _req, res, _next) => {
  console.log('ErrorController: ', err);
  return res
    .status(500)
    .json({ error: true, message: 'server encountered an error' });
};
