const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authMiddleware')

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/checkToken', authenticateToken, (req, res) => {
    res.json({ valid: true });
});
   

module.exports = router;
