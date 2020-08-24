require('dotenv').config({ path: './config/config.env' });
require('./config/database')();
const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

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
