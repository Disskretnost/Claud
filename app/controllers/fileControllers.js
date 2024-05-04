const { Console } = require('console');
const { File } = require('./../models/models'); // Предполагается, что модель File экспортируется из файла models.js
const fs = require('fs');
const path = require('path');

class FileController {
    async getAllFiles(req, res) {
        try {
            const files = await File.findAll({
                where: { userId: req.user.id } // Используем userId из req.user
            });
            res.json(files);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async uploadFile(req, res) {
        try {
            const decodedOriginalName = decodeURIComponent(req.file.originalname);
            const file = await File.create({
                userId: req.user.id, // Используем userId из req.user
                name: req.file.filename, // Используем уникальное имя файла
                path: req.file.path,
                size: req.file.size,
                contentType: req.file.mimetype,
                originalName: decodedOriginalName // Используем декодированное оригинальное имя файла
            });
            res.json(file);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    
    async deleteFile(req, res) {
        try {
            const fileId = req.params.id; // Получаем ID файла из параметров запроса
            const file = await File.findByPk(fileId); // Используем findByPk для поиска по ID
    
            if (!file) {
                return res.status(404).json({ message: "Файл не найден" });
            }
            const userId = req.user.id; // Предполагается, что ID пользователя доступен через req.user.id
            // Используем уникальное имя файла для определения пути к файлу на диске
            const filePath = path.join(__dirname, '../..', `uploads/${userId}/${file.name}`);
            await fs.promises.unlink(filePath);
            await File.destroy({ where: { id: fileId } });
            res.status(200).json({ message: "Файл успешно удален" });
        } catch (err) {
            console.error(err); // Логирование ошибки для отладки
            res.status(500).json({ message: "Ошибка сервера", error: err.message });
        }
    }
    

    async downloadFile(req, res) {
        try {
            const fileId = req.params.id; // Получаем ID файла из параметров запроса
            const file = await File.findByPk(fileId); // Ищем файл по ID
    
            if (!file) {
                return res.status(404).json({ message: "Файл не найден" });
            }
    
            const userId = req.user.id; // Предполагается, что ID пользователя доступен через req.user.id
            // Используем уникальное имя файла для определения пути к файлу на диске
            // Убедитесь, что file.name содержит только имя файла
            const filePath = path.join(__dirname, '../..', `uploads/${userId}/${file.name}`);
    
            // Проверяем, существует ли файл
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "Файл не найден" });
            }
    
            // Отправляем файл пользователю
            // Отправляем файл пользователю
            console.log(file.originalName)
            res.download(filePath, file.originalName, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Ошибка при скачивании файла" });
                }
            });

        } catch (err) {
            console.error(err); // Логирование ошибки для отладки
            res.status(500).json({ message: "Ошибка сервера", error: err.message });
        }
    }
    
    
    
}

module.exports = new FileController();
