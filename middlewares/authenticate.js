const { User } = require('../model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer !== 'Bearer') {
      return res.status(401).send({ message: 'Not authorized' });
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.token) {
        return res.status(401).send({ message: 'Not authorized' });
      }
      req.user = user;
      // next();
    } catch (error) {
      throw new Error(error.maessage);
    }

    next();
  } catch (error) {
    res.status(401).send({ message: 'Not authorized......7' });
  }
};

module.exports = authenticate;
