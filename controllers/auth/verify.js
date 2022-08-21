const { User } = require('../../model/user');

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).send({ message: 'User not found' });
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).send({ message: 'Verification successful' });
};

module.exports = verify;
