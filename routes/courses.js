const router = require('express')();

// ROOT: /api/v1/courses

router.get('/', (req, res) => {
  res.send('get all courses');
});

module.exports = router;
