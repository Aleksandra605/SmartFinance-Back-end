const { Transaction } = require('../../model/transaction');
const mongoose = require('mongoose');

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

const getReports = async (req, res) => {
  const { _id } = req.user;

  const allExpenses = await Transaction.find({
    owner: _id,
    transactionType: 'Expense',
  });

  const allIncomes = await Transaction.find({
    owner: _id,
    transactionType: 'Income',
  });

  //...........................................................................

  const yearsListExpenses = allExpenses.map((el) => {
    return new Date(el.date).getFullYear();
  });

  const yearsListIncomes = allIncomes.map((el) => {
    return new Date(el.date).getFullYear();
  });

  //...........................................................................

  const uniqueYearsExp = yearsListExpenses.filter(
    (year, index, yearsListExpenses) =>
      yearsListExpenses.indexOf(year) === index
  );

  const uniqueYearsInc = yearsListIncomes.filter(
    (year, index, yearsListIncomes) => yearsListIncomes.indexOf(year) === index
  );

  //...........................................................................

  const sortedByYearExp = uniqueYearsExp.map((el) => {
    return [
      el,
      allExpenses.filter((item) => {
        return new Date(item.date).getFullYear() === el;
      }),
    ];
  });

  const sortedByYearInc = uniqueYearsInc.map((el) => {
    return [
      el,
      allIncomes.filter((item) => {
        return new Date(item.date).getFullYear() === el;
      }),
    ];
  });

  //...........................................................................

  const reportsSorter = (array) => {
    return array.map((item) => {
      const x = item[1].reduce((prev, el) => {
        const monthNumber = new Date(el.date).getMonth();

        const monthName = monthNames[monthNumber];

        return {
          ...prev,
          [monthName]: {
            ...prev[monthName],
            [el.category]:
              ((prev[monthName] || {})[el.category] || 0) + el.amount,
          },
        };
      }, {});
      return [item[0], Object.entries(x)];
      // return { [item[0]]: Object.entries(x) };
    });
  };

  const expensesReports = reportsSorter(sortedByYearExp);
  const incomesReports = reportsSorter(sortedByYearInc);

  //...........................................................................

  const totalAmountForYear = (array) => {
    return array.map((el) => {
      return [
        el[0],
        el[1].reduce(
          (totalAmount, transaction) => totalAmount + transaction.amount,
          0
        ),
      ];
    });
  };

  const totalExpensesForYear = totalAmountForYear(sortedByYearExp);
  const totalIncomesForYear = totalAmountForYear(sortedByYearInc);

  //...........................................................................

  res.json({
    expensesReports: expensesReports,
    incomesReports: incomesReports,
    totalExpensesForYear,
    totalIncomesForYear,
  });
};

module.exports = getReports;
