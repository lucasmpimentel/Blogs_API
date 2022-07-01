const error = (err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
};

module.exports = error;
