const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter'); // Путь к вашему файлу fileRouter.js

router.use('/user', userRouter);
router.use('/file', fileRouter); // Используйте префикс '/file' для всех роутов, связанных с файлами

module.exports = router;