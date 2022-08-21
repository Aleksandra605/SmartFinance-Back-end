const { User } = require('../../model/user');

const currentUser = async (req, res) => {
  const { _id } = req.user;

  const current = await User.findById(_id);

  if (!current) {
    res.status(401).json({ message: 'Not authorized' });
  }

  res.status(200).json({
    name: current.name,
    email: current.email,
    avatarURL: current.avatarURL,
    balance: current.balance,
    subscription: current.subscription,
    userId: current._id,
  });
  return;
};

module.exports = currentUser;
