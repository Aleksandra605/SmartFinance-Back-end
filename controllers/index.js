const register = require('./auth/register');
const currentUser = require('./auth/currentUser');
const login = require('./auth/login');
const logout = require('./auth/logout');
const verify = require('./auth/verify');
const repeatVerification = require('./auth/repeatVerification');
const updateAvatar = require('./user/updateAvatar');
const updateBalance = require('./user/updateBalance');
const getBalance = require('./auth/getBalance');
// Transactions
const income = require('./transactions/income');
const expense = require('./transactions/expense');
const deleteTransaction = require('./transactions/deleteTransaction');
const getAllTransactions = require('./transactions/getAllTransactions');
const getReports = require('./transactions/getReports');

module.exports = {
  currentUser,
  register,
  login,
  logout,
  verify,
  repeatVerification,
  updateAvatar,
  income,
  expense,
  deleteTransaction,
  getAllTransactions,
  updateBalance,
  getReports,
  getBalance,
};
