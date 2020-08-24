const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC get all bootcamp
 * @PATH GET /api/v1/bootcamps/
 */

const getBootcamps = async (req, res, next) => {
  try {
    const foundBootcamps = await Bootcamp.find({})

    res
      .status(200)
      .json({ success: true, count: foundBootcamps.length, data: foundBootcamps });
  }

  catch (error) {
    res
      .status(400)
      .json({ success: false, msg: `${error.message}` });
  }
};

module.exports = getBootcamps;
