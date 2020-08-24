/**
 * @DESC delete a bootcamp
 * @PATH DELETE /api/v1/bootcamps/:bootcampId
 */

const deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `deleted a bootcamp ${req.params.bootcampId}` });
};

module.exports = deleteBootcamp;
