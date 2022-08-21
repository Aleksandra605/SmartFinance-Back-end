const { Transaction } = require('../../model/transaction');
const { User } = require('../../model/user');
const getTotalAmount = require('../../helpers/totalAmount');

const deleteTransaction = async (req, res, next) => {
  const { transactionId } = req.params;
  const ownerID = req.user._id;

  const transaction = await Transaction.findById(transactionId);
  const owner = await User.findById(ownerID);

  const updateBalance = await (function () {
    if (transaction.transactionType === 'Expense') {
      return User.findByIdAndUpdate(
        ownerID,
        { balance: Number(owner.balance) + Number(transaction.amount) },
        { new: true }
      );
    } else transaction.transactionType === 'Income';
    return User.findByIdAndUpdate(
      ownerID,
      { balance: Number(owner.balance) - Number(transaction.amount) },
      { new: true }
    );
  })();

  const result = await Transaction.findByIdAndRemove(transactionId);

  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }

  const totalExpenses = await getTotalAmount(ownerID, 'Expense');
  const totalIncomes = await getTotalAmount(ownerID, 'Income');

  return res.status(200).json({
    transactionId,
    //message: 'Transaction deleted.',
    //  userBalance: user.balance,
    totalExpenses,
    totalIncomes,
  });
};

module.exports = deleteTransaction;
