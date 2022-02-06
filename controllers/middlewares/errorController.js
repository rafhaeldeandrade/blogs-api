module.exports = (err, _req, res, _next) =>
  res.status(500).json({ error: true, message: 'server encountered an error' });
