/**
 * @DESC update a bootcamp
 * @PATH PUT /api/v1/bootcamps/:bootcampId
 */

const updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `updated bootcamp ${req.params.bootcampId}` });
};

module.exports = updateBootcamp;
