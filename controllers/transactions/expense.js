const { Transaction } = require('../../model/transaction');
const { User } = require('../../model/user');
const getTotalAmount = require('../../helpers/totalAmount');
const dateMaker = require('../../helpers/dateMaker');

const expense = async (req, res, next) => {
  const ownerID = req.user._id;
  const amount = req.body.amount;

  const owner = await User.findById(ownerID);

  if (!owner) {
    res.status(404).send({ message: 'Not found' });
  }

  await User.findByIdAndUpdate(
    ownerID,
    { balance: Number(owner.balance) - Number(amount) },
    { new: true }
  );

  const newTransaction = {
    ...req.body,
    transactionType: 'Expense',
    owner: req.user._id,
  };
  const result = await Transaction.create(newTransaction);

  const configuredDate = dateMaker(result.date);

  const totalExpenses = await getTotalAmount(ownerID, 'Expense');

  res.status(201).json({
    newTransaction: {
      date: configuredDate,
      category: result.category,
      description: result.description,
      amount: result.amount,
      transactionType: 'Expense',
      owner: req.user._id,
      _id: result._id,
    },
    totalExpenses: totalExpenses,
  });
};

module.exports = expense;
