const router = require('express')();

// ROOT: /api/v1/users

router.get('/', (req, res) => {
  res.send('users route');
});

module.exports = router;
