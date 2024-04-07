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
        // Создаем путь к папке пользователя, используя его ID
        const userId = req.params.userId;
        const dir = path.join(__dirname, 'uploads', userId);

        // Создаем папку, если она еще не существует
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: function(req, file, cb) {
        // Используем оригинальное имя файла с добавлением временной метки для уникальности
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Роут для получения всех файлов пользователя
router.get('/:userId/files', authMiddleware, FileController.getAllFiles);

// Роут для загрузки файла
router.post('/:userId/files', authMiddleware, upload.single('file'), FileController.uploadFile);

module.exports = router;
