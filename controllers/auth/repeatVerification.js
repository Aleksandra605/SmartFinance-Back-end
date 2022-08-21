const { User } = require('../../model/user');
const sendMail = require('../../helpers/sendMail');

const repeatVerification = async (req, res) => {
  const { verificationToken } = req.params;
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ message: 'Missing required field email' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send({ message: `User with email ${email} was not found` });
  }
  if (user.verify) {
    res.status(400).send({ message: 'Verification has already been passed' });
  }

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };

  await sendMail(mail);

  res.json({ message: 'Verification email sent' });
};

module.exports = repeatVerification;
