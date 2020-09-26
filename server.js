require('dotenv').config({ path: './config/config.env' });
require('./config/database')();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const morgan = require('morgan');
const chalk = require('chalk');
const toCatchError = require('./middlewares/toCatchError');

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100 // 100 request
    // 100 request in 10 mins
})

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xssClean());
app.use(rateLimiter);
app.use(cors(corsOptions));
app.options('*', cors())
app.use(hpp());
app.use(fileupload());

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
