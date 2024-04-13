const { File } = require('./../models/models'); // Предполагается, что модель File экспортируется из файла models.js

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
            const file = await File.create({
                userId: req.user.id, // Используем userId из req.user
                name: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                contentType: req.file.mimetype
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
    
            // Удаление файла из файловой системы
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(__dirname, '../uploads', file.userId.toString(), file.name); // Убедитесь, что userId преобразован в строку
    
            fs.unlink(filePath, async (err) => {
                if (err) {
                    return res.status(500).json({ message: "Ошибка при удалении файла из файловой системы" });
                }
    
                // Удаление информации о файле из базы данных
                await File.destroy({ where: { id: fileId } }); // Используем destroy для удаления записи
    
                res.status(200).json({ message: "Файл успешно удален" });
            });
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }
    
}

module.exports = new FileController();
