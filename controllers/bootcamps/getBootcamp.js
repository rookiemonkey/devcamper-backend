const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC get a bootcamp
 * @PATH GET /api/v1/bootcamps/:bootcampId
 */

const getBootcamp = async (req, res, next) => {
  try {
    const foundBootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!foundBootcamp) { throw new Error(`Bootcamp doesn't exists`) }

    res
      .status(200)
      .json({ success: true, data: foundBootcamp });
  }

  catch (error) {
    res
      .status(400)
      .json({ success: false, msg: `${error.message}` });
  }
};

module.exports = getBootcamp;
