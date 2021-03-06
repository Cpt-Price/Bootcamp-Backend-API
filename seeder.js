const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const BootcampModel = require('./models/Bootcamp');
const CourseModel = require('./models/Course');

// connect to database
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
});

// read the json files in _data
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

// Import data
const importData = async() =>{
    try {
        await BootcampModel.create(bootcamps);
        await CourseModel.create(courses);
        console.log('Data loaded '.blue);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}


const deleteData = async() =>{
    try {
        await BootcampModel.deleteMany();
        await CourseModel.deleteMany();
        console.log('Data deleted '.red);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
    deleteData();
}