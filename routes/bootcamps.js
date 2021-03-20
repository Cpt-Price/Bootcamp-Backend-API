const express = require('express');
const router = express.Router();

// get all bootcamps
router.get('/', (req, res) => { 
    res.status(200).json({ success: true, msg: 'List of all bootcamps'});
});

// get bootcamp with specific ID
router.get('/:id', (req, res) => { 
    res.status(200).json({ success: true, msg:`Get bootcamp ${req.params.id}`});
});

// bootcamp creation
router.post('/', (req, res) => { 
    res.status(200).json({ success: true, msg: 'Create a new bootcamp'});
});

//update bootcamp with ID
router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}`});
});

//delete a bootcamp
router.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}`});
});



module.exports = router;