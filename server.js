const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colourCoding = require('colors');
const errorHandler = require('./middleware/error');

// hello world
// load the config file
dotenv.config({path: './config/config.env'});

// Connect to the database
connectDB();

// load the route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/coursesRoute');

const app = express();

// Body parser
app.use( express.json() );

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// mount the routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses)

// errorHandler after the routes have been mounted
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server = app.listen(
    PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.black.bgBrightGreen)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.white.bgBrightRed);
    
    // stop the server
    server.close( () => process.exit(1));
});
