// Dependencies
const router = require('express').Router();

// Middleware
const middleware = require('../middleware/middleware');

// Controllers
const users = require('../controllers/usersCtrl');

// Define routes and mapping them to controllers
// USER ENDPOINTS
router.route('/')
  .post(users.create); // Creates a new user.

router.route('/login')
  .post(users.login); // Creates a new user.

// Token authentication
router.use(middleware.authenticate);

router.route('/')
  .get(users.getAll);

router.route('/:user_id')
  .get(users.getUser) // Find user.
  .put(users.update); // Update user info.
  
module.exports = router;
