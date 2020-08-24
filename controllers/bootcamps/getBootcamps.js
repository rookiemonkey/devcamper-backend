/**
 * @DESC get all bootcamp
 * @PATH GET /api/v1/bootcamps/
 */

const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all bootcamps` });
};

module.exports = getBootcamps;
