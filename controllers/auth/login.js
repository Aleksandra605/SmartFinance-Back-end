const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // if (!user || !user.verify) {
  //   res.status(401).send({
  //     message: 'Email or password is wrong...',
  //   });
  // }

  if (!user) {
    res.status(401).send({
      message: 'Email or password is wrong...',
    });
  }

  const compareResult = bcrypt.compareSync(password, user.password);
  if (!compareResult) {
    res.status(401).send({ message: 'Email or password is wrong' });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });
  const userData = await User.findById(user._id);

  res.status(200).json({
    token,
    userInfo: {
      name: userData.name,
      email: `${email}`,
      avatarURL: userData.avatarURL,
      balance: userData.balance,
      subscription: 'starter',
      userId: userData._id,
    },
  });

  return;
};

module.exports = login;
