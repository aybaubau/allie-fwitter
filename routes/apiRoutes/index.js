const router = require('express').Router();
const userRoutes = require('./userRoutes');
const fweetRoutes = require('./fweetRoutes');
// /api/users
// api prepended to every Route
router.use('/users', userRoutes);
router.use('/fweets', fweetRoutes);

module.exports = router;
