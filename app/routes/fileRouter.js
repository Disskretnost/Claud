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
        const userId = String(req.user.id);
        const dir = path.join(__dirname, './../../uploads', userId);
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
        const userId = req.user.id;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${userId}-${file.originalname}-${uniqueSuffix}`);
    }
});



const upload = multer({ storage: storage });

router.get('/files', authMiddleware, FileController.getAllFiles);
router.post('/uploadFile', authMiddleware, upload.single('file'), FileController.uploadFile);
router.delete('/delete/:id', authMiddleware, FileController.deleteFile);
router.get('/download/:id', authMiddleware, FileController.downloadFile);

module.exports = router;
