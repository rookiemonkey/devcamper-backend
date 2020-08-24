// dir _seeds includes all the seeds (dummy data)

require('dotenv').config({ path: './config/config.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Bootcamp = require('./models/Bootcamp');


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
    useFindAndModify: true,
})


// read seeds json files
const Bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_seeds/bootcamps.json`, 'utf-8'))


// function to import/delete to database
const importData = async () => {
    try {
        await Bootcamp.create(Bootcamps);
        console.log(chalk.blue('Data Imported to the database'));
        process.exit();
    }
    catch (error) { console.log(chalk.bgRed('Failed Importing'), error) }
}

const destroyData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log(chalk.blue('Data Destroyed'));
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