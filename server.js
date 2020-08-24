require('dotenv').config({ path: './config/config.env' });
const app = require('express')();
const morgan = require('morgan');

if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

// =======================================================
// ROUTES
// =======================================================
app.use('/api/v1/bootcamps', require('./routes/bootcamps'));
app.use('/api/v1/courses', require('./routes/courses'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} started at PORT:${process.env.PORT}`
  );
});
