const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDatabase = async () => {
  const connect = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(
    chalk.yellow(`${Date()} MongoDB Connected ${connect.connection.host}`)
  );
};

module.exports = connectDatabase;
