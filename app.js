const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/api/auth');
const transactionRouter = require('./routes/api/transactionsRouter');
const app = express();

var corsOptions = {
  origin: 'https://aleksandra605.github.io/smart-finance/',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
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
