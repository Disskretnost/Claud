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
    filename: function(req, file, cb) {
        // Используем оригинальное имя файла с добавлением временной метки для уникальности
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

router.get('/files', authMiddleware, FileController.getAllFiles);

router.post('/uploadFile', authMiddleware, upload.single('file'), FileController.uploadFile);
router.delete('/delete/:id', authMiddleware, FileController.deleteFile);


module.exports = router;
