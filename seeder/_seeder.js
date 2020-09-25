// dir _seeds includes all the seeds (dummy data)
// seeds files are in json format depending on the schema fields

require('dotenv').config({ path: './config/config.env' });
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const mongoose = require('mongoose');
const chalk = require('chalk');
const Bootcamp = require('../models/Bootcamp');
const Course = require('../models/Course');
const Review = require('../models/Review');
const User = require('../models/User');

// check user options
if (!process.argv[2]) {
    console.log(chalk.yellow(
        `Please provide options: 
        -i = to Import dummy data to the database 
        -d = to Destroy dummy data from the database`))
    process.exit()
}

// connect to database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})


// read seeds json files
const Bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_seeds/bootcamps.json`, 'utf-8'));
const Courses = JSON.parse(fs.readFileSync(`${__dirname}/_seeds/courses.json`, 'utf-8'));
const Users = JSON.parse(fs.readFileSync(`${__dirname}/_seeds/users.json`, 'utf-8'));
const Reviews = JSON.parse(fs.readFileSync(`${__dirname}/_seeds/reviews.json`, 'utf-8'));


// function to import/delete to database
const importData = async () => {
    try {
        const spinner = new Spinner('Importing data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();
        await Bootcamp.create(Bootcamps);
        await Course.create(Courses);
        await User.create(Users);
        await Review.create(Reviews);
        spinner.stop(true);
        console.log(chalk.green('Data Imported to the database'));
        process.exit();
    }
    catch (error) { console.log(chalk.bgRed('Failed Importing'), error) }
}

const destroyData = async () => {
    try {
        const spinner = new Spinner('Destroying data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        spinner.stop(true);
        console.log(chalk.green('Data Destroyed'));
        process.exit();
    }
    catch (error) { console.log(chalk.bgRed('Failed Destroying'), error) }
}


// on terminal: node seeder.js <option> 
switch (process.argv[2]) {
    case '-i':
        importData();
        break;

    case '-d':
        destroyData();
        break;

    default:
        return null
        break;
}