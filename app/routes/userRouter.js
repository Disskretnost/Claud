const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
//router.get('/auth', authMiddleware, UserController.check); //проверка на авторизованность

module.exports = router;
