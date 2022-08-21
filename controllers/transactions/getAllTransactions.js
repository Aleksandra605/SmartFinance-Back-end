const { Transaction } = require('../../model/transaction');
const mongoose = require('mongoose');
const dateMaker = require('../../helpers/dateMaker');

const getAllTransactions = async (req, res) => {
  const { _id } = req.user;

  const sortedExpenses = await Transaction.find({
    owner: _id,
    transactionType: 'Expense',
  }).sort({ date: -1 });

  const sortedIncomes = await Transaction.find({
    owner: _id,
    transactionType: 'Income',
  }).sort({ date: -1 });

  //....................................................................

  const allExpenses = sortedExpenses.map((el) => {
    const configuredDate = dateMaker(el.date);

    return {
      _id: el._id,
      category: el.category,
      description: el.description,
      amount: el.amount,
      transactionType: el.transactionType,
      date: configuredDate,
      owner: el.owner,
    };
  });

  const allIncomes = sortedIncomes.map((el) => {
    const configuredDate = dateMaker(el.date);

    return {
      _id: el._id,
      category: el.category,
      description: el.description,
      amount: el.amount,
      transactionType: el.transactionType,
      date: configuredDate,
      owner: el.owner,
    };
  });

  res.json({
    status: 'success',
    code: 200,
    Expenses: allExpenses,
    Incomes: allIncomes,
  });
};

module.exports = getAllTransactions;
