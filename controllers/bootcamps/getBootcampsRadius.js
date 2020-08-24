const Bootcamp = require('../../models/Bootcamp');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const geocoder = require('../../utils/geocoder');

/**
 * @DESC get all bootcamp w/in Radius
 * @PATH GET /api/v1/bootcamps/radius/:zipcode/:distance
 */

const getBootcampsWithinRadius = toHandleAsync(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const location = await geocoder.geocode(zipcode);
  const latitude = location[0].latitude;
  const longitude = location[0].longitude;

  // calculate radius, divided by radius of Earth 3,963 miles
  const radius = distance / 3963;

  const foundBootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] }
    }
  })

  res
    .status(200)
    .json({ success: true, count: foundBootcamps.length, data: foundBootcamps });
});

module.exports = getBootcampsWithinRadius;
