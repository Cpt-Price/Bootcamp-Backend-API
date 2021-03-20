// @desc        GET all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg:'Get all bootcamps'});
}

//-----------------------------------------------------
// @desc        GET a single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public

exports.getSingleBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg:`Get bootcamp ${req.params.id}`});
}

//-----------------------------------------------------
// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private

exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create a new bootcamp'});
}

//-----------------------------------------------------
// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}`});
}

//-----------------------------------------------------
// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}`});
}