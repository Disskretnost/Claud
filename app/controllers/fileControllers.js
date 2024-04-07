const File = require('../models/file'); // Предполагается, что модель File экспортируется из файла models.js

exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.findAll({
            where: { userId: req.params.userId }
        });
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        const file = await File.create({
            userId: req.params.userId,
            name: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            contentType: req.file.mimetype
        });
        res.json(file);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};