const express = require('express');
const router = express.Router();
const { validation, authenticate } = require('../../middlewares/index');
const { transactionJoi } = require('../../model/transaction');
const getReportsByCategory = require('../../controllers/transactions/getReportsByCategory');
const getSummaryList = require('../../controllers/transactions/getSummaryList');

const {
  income,
  expense,
  deleteTransaction,
  getAllTransactions,
  getReports,
} = require('../../controllers/index');

router.get('/', authenticate, getAllTransactions);
router.post('/income', authenticate, validation(transactionJoi), income);
router.post('/expense', authenticate, validation(transactionJoi), expense);
router.delete('/:transactionId', authenticate, deleteTransaction);
router.get('/summary', authenticate, getSummaryList);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/reports', authenticate, getReports);
router.post('/reports_by_category', authenticate, getReportsByCategory);

module.exports = router;
