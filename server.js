require('dotenv').config({ path: './config/config.env' });
require('./config/database')();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const chalk = require('chalk');
const toCatchError = require('./middlewares/toCatchError');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileupload())

if (process.env.NODE_ENV === 'development') {
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

// =======================================================
// ERROR
// =======================================================
app.use(toCatchError)

// =======================================================
// SERVER
// =======================================================
const server = app.listen(process.env.PORT, () => {
    console.log(
        chalk.yellow(
            `Server running in ${process.env.NODE_ENV} started at PORT:${process.env.PORT}`
        )
    );
});

process.on('unhandledRejection', (err, promise) => {
    console.log(chalk.red(`Error: ${err.message}`));
    server.close(() => {
        process.exit(1);
    });
});
