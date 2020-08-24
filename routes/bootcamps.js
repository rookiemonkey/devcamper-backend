const router = require('express')();
const getBootcamps = require('../controllers/bootcamps/getBootcamps');
const getBootcamp = require('../controllers/bootcamps/getBootcamp');
const createBootcamp = require('../controllers/bootcamps/createBootcamp');
const updateBootcamp = require('../controllers/bootcamps/updateBootcamp');
const deleteBootcamp = require('../controllers/bootcamps/deleteBootcamp');

// ROOT: /api/v1/bootcamps

router
  .get('/', getBootcamps)
  .post('/', createBootcamp)
  .get('/:id', getBootcamp)
  .put('/:id', updateBootcamp)
  .delete('/:id', deleteBootcamp);

module.exports = router;
