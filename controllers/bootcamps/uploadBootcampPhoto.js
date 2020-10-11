const path = require('path');
const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC uplaod a photo for bootacmp
 * @PATH PUT /api/v1/bootcamps/:bootcampId/photo
 */

const uploadBootcampPhoto = toHandleAsync(async (req, res, next) => {
    const foundBootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!foundBootcamp) {
        return next(new ErrorResponse(`Bootcamp doesn't exists`, 400))
    }

    // check if there was an uploaded photo
    if (!req.files) {
        return next(new ErrorResponse('Please upload a bootcamp photo', 400))
    }

    // check if the owner of the bootcamp
    if (JSON.stringify(req.user._id) !== JSON.stringify(foundBootcamp.user)) {
        return next(new ErrorResponse('Invalid Request', 400))
    }

    const { file } = req.files;

    // check file type
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload a valid bootcamp photo', 400))
    }

    // check file size
    if (file.size > process.env.FILE_UPLOAD_MAX_SIZE) {
        return next(new ErrorResponse(`Please upload a file less than ${process.env.FILE_UPLOAD_MAX_SIZE}`, 400))
    }

    // custom file name
    file.name = `photo_${foundBootcamp._id}${path.parse(file.name).ext}`

    // upload the file using the mv function attached to the file. takes in a callback
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async error => {
        if (error) {
            return next(new ErrorResponse(`Problem with file upload: ${error.message}`, 500))
        }

        await Bootcamp.findByIdAndUpdate(req.params.bootcampId, { photo: file.name })

        res
            .status(200)
            .json({ success: true, data: file.name });
    })
});

module.exports = uploadBootcampPhoto;
