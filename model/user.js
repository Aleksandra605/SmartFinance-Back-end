const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { required } = require('joi');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const userSchemaJoi = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const balanceSchemaJoi = Joi.object({
  balance: Joi.number().required(),
});

const User = model('user', userSchema); // compiling our schema into a Model

module.exports = { User, userSchemaJoi, balanceSchemaJoi };
