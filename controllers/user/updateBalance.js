const { User } = require('../../model/user');

const updateBalance = async (req, res) => {
  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }

  res.json({ status: 'success', code: 201, data: { result } });
};

module.exports = updateBalance;
