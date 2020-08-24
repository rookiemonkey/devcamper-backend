const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC delete a bootcamp
 * @PATH DELETE /api/v1/bootcamps/:bootcampId
 */

const deleteBootcamp = async (req, res, next) => {
  try {
    const foundBootcamp = await Bootcamp.findByIdAndDelete(req.params.bootcampId)
    if (!foundBootcamp) { throw new Error(`Bootcamp doesn't exists`) }

    res
      .status(200)
      .json({ success: true, data: {} });
  }

  catch (error) {
    res
      .status(400)
      .json({ success: false, msg: `${error.message}` });
  }
};

module.exports = deleteBootcamp;
