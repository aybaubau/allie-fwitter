const router = require('express')
  .Router();
const jwt = require('jsonwebtoken');
// /auth prepended to everything
const signInMiddleware = require('../../middlewares/signInMiddleware');
// /auth/signin

const { signInApi, signUpApi } = require('../../controllers/authController');

router.post('/signin', signInMiddleware, signInApi);
router.post('/signup', signUpApi);

module.exports = router;
