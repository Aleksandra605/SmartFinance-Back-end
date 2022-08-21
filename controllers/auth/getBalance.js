const { User } = require('../../model/user');

const getBalance = async (req, res) => {
  const { _id } = req.user;

  const current = await User.findById(_id);

  if (!current) {
    res.status(401).json({ message: 'Not authorized' });
  }

  res.status(200).json({
    balance: current.balance,
  });
  return;
};

module.exports = getBalance;
