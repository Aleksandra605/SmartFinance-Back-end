const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { required } = require('joi');
const { any } = require('../middlewares/upload');

const transactionSchema = Schema(
  {
    transactionType: { type: String, enum: ['Income', 'Expense'] },
    category: {
      type: String,
      enumExp: [
        'Transport',
        'Products',
        'Health',
        'Alcohol',
        'Home',
        'Entertainment',
        'Technics',
        'Public Utilities, connection',
        'Sports, hobbies',
        'Education',
        'Other',
      ],
      required: true,
      default: 'Other',
      enumInc: ['Salary', 'Additional income'], // fixed here
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    amount: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user', //из какой коллекции брать (если название коллекции написано во множественном числе, то писать название тут надо в единственном)
    },
    date: { type: Date },
  },
  { versionKey: false, timestamps: false }
);

const transactionJoi = Joi.object({
  category: Joi.string().required(),
  description: Joi.string(),
  amount: Joi.number().required(),
  date: Joi.date(),
});

const Transaction = model('transaction', transactionSchema);

module.exports = { Transaction, transactionJoi };
