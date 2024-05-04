const ApiError = require('../errors/ApiError.js');
const {User} = require('../models/models.js');

const jwt = require('jsonwebtoken'); 
const argon2 = require('argon2');
const generateJwtToken = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res) {
        const {email, password, username, role} = req.body;
        if (!username ||!password ||!email) {
            return res.status(400).json({ message: "Username, password, and email are required" });
        }
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" }); 
        }
        const hashedPassword = await argon2.hash(password);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            role: role, 
        });
        const token = generateJwtToken(user.id, user.email);
        return res.status(201).json({ 
            token,
            user: { 
                id: user.id, 
                username: user.username,
                email: user.email, 
                role: user.role 
            },
        });
    }
    
    
    async login(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user){
            return res.status(404).json( {message: "Пользователь не найден" });
        }
        const verify = await argon2.verify(user.password, password);
        if (!verify){
            return res.status(404).json( {message: "Пароли не совпадают" });
        }
        const token = generateJwtToken(user.id, user.email);
        return res.status(200).json({
            token,
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                role: user.role 
            }
        });
    }
    

    async getAllUsers(req, res) {
        try {
            // Получаем всех пользователей
            const users = await User.findAll();

            // Возвращаем список пользователей
            return res.status(200).json(users);
        } catch (err) {
            // Обработка ошибок
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new UserController();


