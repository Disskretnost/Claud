const Router = require('express');
const router = new Router();
const FileController = require('../controllers/fileControllers');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Настройка Multer для создания уникальной папки для каждого пользователя
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Преобразуем userId в строку
        const userId = String(req.user.id);
        const dir = path.join(__dirname, './../uploads', userId);

        // Создаем папку, если она еще не существует
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        } catch (error) {
            cb(error);
        }
    },
    filename: function (req, file, cb) {
        // Используйте ID пользователя и оригинальное имя файла.
        const userId = req.user.id; // Предполагается, что ID пользователя доступен через req.user.id
        cb(null, `${userId}-${file.originalname}`);
      }
});


const upload = multer({ storage: storage });

router.get('/files', authMiddleware, FileController.getAllFiles);

router.post('/uploadFile', authMiddleware, upload.single('file'), FileController.uploadFile);
router.delete('/delete/:id', authMiddleware, FileController.deleteFile);
//router.get('/download/:id',authMiddleware, FileController.downloadFile);
router.get('/download/:id', authMiddleware, FileController.downloadFile);

module.exports = router;
