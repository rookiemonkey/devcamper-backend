const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC update a bootcamp
 * @PATH PUT /api/v1/bootcamps/:bootcampId
 */

const updateBootcamp = async (req, res, next) => {
  try {
    const foundBootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.bootcampId, req.body, { new: true, runValidators: true }
    )
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

module.exports = updateBootcamp;
