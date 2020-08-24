/**
 * @DESC get a bootcamp
 * @PATH GET /api/v1/bootcamps/:bootcampId
 */

const getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get a bootcamp ${req.params.bootcampId}` });
};

module.exports = getBootcamp;
