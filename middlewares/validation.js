const validation = (schema) => {
  const transactionValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: 'bad request.......' });
    }

    next();
  };
  return transactionValidation;
};

module.exports = validation;
