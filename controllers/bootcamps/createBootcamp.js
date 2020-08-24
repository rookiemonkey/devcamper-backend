/**
 * @DESC create a bootcamp
 * @PATH POST /api/v1/bootcamps/
 */

const createBootcamp = (req, res, next) => {
  res.status(200).json({ sucess: true, msg: `create a bootcamp` });
};

module.exports = createBootcamp;
