const router = require('express')
  .Router();
const {
  getAllFweetsApi,
  getFweetByIdApi,
  createFweetApi,
  deleteFweetByIdApi,
} = require('../../../controllers/fweetController');
const authMiddleware = require('../../../middlewares/authorizationMiddleware');
// /api/users prepended to every Route
// Separation of concern.
// Anything that has to do with routing stays in routing
// anythign that has to do with models, stays in models
// all of the logic that happens when an endpoint/API
// goes to the controller
// Model database stuff
// View front end stuff
// Controller backend stuff that determines how urls are parsed and the logic that goes behind
// Also the controllers job to communicate between the view and the model
//   /api/users
router.use(authMiddleware);


router.route('/')
  .get(getAllFweetsApi)
  .post(createFweetApi);

router.route('/:fweetId')
  .get(getFweetByIdApi)
  .delete(deleteFweetByIdApi);

module.exports = router;
