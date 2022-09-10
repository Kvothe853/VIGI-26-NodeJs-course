const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

module.exports = {
  isLoggedIn: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      req.user = jwt.verify(token, jwtSecret);
      next();
    } catch (err) {
      res.status(401).send({ err: 'Invalid Token' });
    }
  },
  isAuth: async (req) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      jwt.verify(token, jwtSecret);
      return true;
    } catch (err) {
      return false;
    }
  },
};
