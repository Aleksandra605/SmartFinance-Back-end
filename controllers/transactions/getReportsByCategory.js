const { Transaction } = require('../../model/transaction');
const { User } = require('../../model/user');

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getReportsByCategory = async (req, res) => {
  const { _id } = req.user;
  const year = req.body.year;
  const month = req.body.month;
  const category = req.body.category;

  const owner = await User.findById(_id);

  if (!owner) {
    res.status(404).send({ message: 'Not found' });
  }

  const filterByCategory = await Transaction.find({
    owner: _id,
    category: category,
  });

  const filterByDate = filterByCategory
    .filter((el) => new Date(el.date).getFullYear() === Number(year))
    .filter((el) => monthNames[el.date.getMonth()] === month);

  const filteredReports = filterByDate.map((el) => {
    return { description: el.description, amount: el.amount };
  });

  const x = filteredReports.reduce((prev, el) => {
    return {
      ...prev,
      [el.description]: (prev[el.description] || 0) + el.amount,
    };
  }, {});

  const reports = await Object.entries(x);

  return res.json({
    reportByCategory: reports,
  });
};

module.exports = getReportsByCategory;
