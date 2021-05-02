const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @desc        GET courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @route       GET /api/v1/courses
// @access      Public
exports.getCourses = asyncHandler( async (req, res, err) => {
    let query;

    if(req.params.bootcampId){
        query = Course.find({bootcamp: req.params.bootcampId});
    }
    else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    let getRes = await query;

    res.status(200).json({
        success: true,
        count: getRes.length,
        data: getRes
    });
});