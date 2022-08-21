const { Transaction } = require('../model/transaction');

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

const getTotalAmount = async (userId, type) => {
  const transactions = await Transaction.find({
    owner: userId,
    transactionType: type,
  }).sort({ date: -1 });

  const yearsList = transactions.map((el) => {
    return new Date(el.date).getFullYear();
  });

  const uniqueYears = yearsList.filter(
    (year, index, yearsList) => yearsList.indexOf(year) === index
  );

  const sortedByYear = uniqueYears.map((el) => {
    return [
      el,
      transactions.filter((item) => {
        return new Date(item.date).getFullYear() === el;
      }),
    ];
  });

  const totalAmounts = sortedByYear.map((item) => {
    const x = item[1].reduce((prev, el) => {
      const monthNumber = new Date(el.date).getMonth();

      const monthName = monthNames[monthNumber];

      return {
        ...prev,
        [monthName]: (prev[monthName] || 0) + el.amount,
      };
    }, 0);
    return [item[0], Object.entries(x)];
  });

  return totalAmounts;
};

module.exports = getTotalAmount;
