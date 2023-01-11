const app = require('../app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
