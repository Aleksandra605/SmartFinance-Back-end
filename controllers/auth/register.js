// const sendMail = require('../../helpers/sendMail');
const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).send({ message: 'Email in use' });
  }

  // const image = gravatar.url(email);
  const image = gravatar.url('sasha@gmail.com');

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();

  const payload = {
    id: email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  const newUser = await User.create({
    token,
    name,
    email,
    password: hashPassword,
    avatarURL: image,
    verificationToken,
  });

  // const mail = {
  //   to: email,
  //   subject: 'Подтверждение регистрации',
  //   html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  // };

  // await sendMail(mail);

  res.status(201).json({
    token,
    userInfo: {
      name: `${name}`,
      email: `${email}`,
      avatarURL: image,
      balance: 0,
      subscription: 'starter',
      id: newUser._id,
    },
  });

  return newUser;
};

module.exports = register;
