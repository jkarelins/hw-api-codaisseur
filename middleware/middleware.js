let counter = 0;

const counterMiddleware = (req, res, next) => {
  if (counter < 5) {
    counter++;
    return next();
  }
  return res.status(429).end();
};

module.exports = { counterMiddleware };
