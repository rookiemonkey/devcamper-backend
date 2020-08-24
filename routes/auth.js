const router = require('express')();

// ROOT: /api/v1/auth

router.get('/', (req, res) => {
  res.send('auth route');
});

module.exports = router;
