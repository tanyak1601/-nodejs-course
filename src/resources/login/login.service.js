const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const authorization = async ({ login, password }) => {
  const user = await User.findOne({ login });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = { userId: user.id, login };
      const token = jwt.sign(payload, JWT_SECRET_KEY);
      return token;
    }
  }

  return null;
};

module.exports = {
  authorization
};
