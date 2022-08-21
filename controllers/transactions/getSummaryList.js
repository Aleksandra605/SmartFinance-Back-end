const getTotalAmount = require('../../helpers/totalAmount');

const getSummaryList = async (req, res) => {
  const { _id } = req.user;

  const summaryExpenses = await getTotalAmount(_id, 'Expense');
  const summaryIncomes = await getTotalAmount(_id, 'Income');

  res.json({
    status: 'success',
    code: 200,
    summaryExpenses,
    summaryIncomes,
  });
};

module.exports = getSummaryList;
