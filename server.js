const express = require('express');
const dotenv = require('dotenv');

// load the config file
dotenv.config({path: './config/config.env'});

// load the route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// mount the routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
