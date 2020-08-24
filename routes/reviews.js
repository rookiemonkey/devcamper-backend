const router = require('express')();

// ROOT: /api/v1/reviews

router.get('/', (req, res) => {
  res.send('get all reviews');
});

module.exports = router;
