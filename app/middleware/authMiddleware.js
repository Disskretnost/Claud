const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next(); // Если вы хотите пропустить OPTIONS запросы
    }

    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Пользователь не авторизован"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next(); // Передача управления следующему middleware
    } catch (err) {
        res.status(401).json({message: "Пользователь не авторизован"});
        // Если вы хотите обработать ошибку в другом месте, вызовите next() с аргументом err
        // next(err);
    }
};
