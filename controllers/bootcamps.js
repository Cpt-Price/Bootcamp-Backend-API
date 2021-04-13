const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');

// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    // create a copy of req.query
    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    let queryStr = JSON.stringify(reqQuery);

    // adding $ before the operators gte -> $gte
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    queryExecution = Bootcamp.find(JSON.parse(queryStr));

    // ensure that the query is in correct format i.e. an instance of Query class
    // The Model.find() function returns an instance of Mongoose's Query class. The Query class represents // a raw CRUD operation that you may send to MongoDB. It provides a ->chainable<- interface for 
    // building up more sophisticated queries.

    // then check if select query exists in the main req.query
    // then split the req.query.select at "," and join the resulting array using spaces/" "

    if(req.query.select){
    // console.log(req.query.select);
        const fields = req.query.select.split(',').join(' '); 
        queryExecution = queryExecution.select(fields);
    }

    // Sorting
    if(req.query.sort){
        // console.log(req.query.sort);
        const sortBy = req.query.sort.split(',').join(' ');
        queryExecution = queryExecution.sort(sortBy);
        
    }
  
    const getRes = await queryExecution;

    if(!getRes){
        return next( new ErrorResponse(`Unable to find bootcamps`, 404));
    }

    res.status(200).json({
        success: true,
        count:getRes.length,
        data: getRes
    });

});

//-----------------------------------------------------
// @desc        GET a single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public

exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {
    const getRes = await Bootcamp.findById(req.params.id);

    if(!getRes){
       return next(new ErrorResponse(`Unable to find bootcamp with ID ${req.params.id}`, 404));
    }

   res.status(200).json({
        success: true,
        data: getRes
   })    
});

//-----------------------------------------------------
// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const createRes = await Bootcamp.create(req.body);

    if(!createRes){
        return next(new ErrorResponse(`Unable to complete request`, 404));
    }

    res.status(201).json({
        success: true,
        data: createRes
    });
});

//-----------------------------------------------------
// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private

exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    const getRes = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!getRes){
        return next(new ErrorResponse(`Bootcamp not found wit ID ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: getRes
    });

});

//-----------------------------------------------------
// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const delRes = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!delRes){
        return next(new ErrorResponse(`Unable to delete bootcamp with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: delRes
    });

});

//-----------------------------------------------------
// @desc        Get bootcamps within radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private

exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // get latitude and longitude fom geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    
    // calculate the radius in radians
    // earth's radius = 6,378 km

    const radius = distance / 6378;

    const getRes = await Bootcamp.find({
        location: { $geoWithin : { $centerSphere: [ [lng, lat], radius ] } }
    });

  
    res.status(200).json({
        success: true,
        count: getRes.length,
        data: getRes
    });

});