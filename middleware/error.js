const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let errorCopy = { ...err};

    errorCopy.message = err.message;
    console.log(err.name);

    // invalid bootcamp id
    if(err.name === 'CastError'){
        const message = `Resource not found with id ${errorCopy.value}`;
        errorCopy = new ErrorResponse(message, 404);

    }

    // duplicate key
    if(err.code === 11000){
        const message = 'Duplicate field values entered';
        errorCopy = new ErrorResponse(message, 400);
    }

    // validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        errorCopy = new ErrorResponse(message, 400);
    }


    res.status(errorCopy.statusCode || 500).json({
        success: false,
        error: errorCopy.message || `Server Error`
    });
}

module.exports = errorHandler;