const mongoose = require('mongoose');

const connectDatabase = async () => {
  const connect = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log(`${Date()} MongoDB Connected ${connect.connection.host}`);
};

module.exports = connectDatabase;
