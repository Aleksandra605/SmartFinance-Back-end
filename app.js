const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/api/auth');
const transactionRouter = require('./routes/api/transactionsRouter');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors({origin: 'https://aleksandra605.github.io/smart-finance/'}));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', authRouter);
app.use('/api/transactions', transactionRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
