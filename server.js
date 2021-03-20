const express = require('express');
const dotenv = require('dotenv');

// load the config file
dotenv.config({path: './config/config.env'});

const app = express();


// get all bootcamps
app.get('/api/v1/bootcamps', (req, res) => { 
    res.status(200).json({ success: true, msg: 'List of all bootcamps'});
});

// get bootcamp with specific ID
app.get('/api/v1/bootcamps/:id', (req, res) => { 
    res.status(200).json({ success: true, msg:`Get bootcamp ${req.params.id}`});
});

// bootcamp creation
app.post('/api/v1/bootcamps', (req, res) => { 
    res.status(200).json({ success: true, msg: 'Create a new bootcamp'});
});

//update bootcamp with ID
app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}`});
});

//delete a bootcamp
app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}`});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
