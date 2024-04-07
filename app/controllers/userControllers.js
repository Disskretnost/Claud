const ApiError = require('../errors/ApiError.js');
const {User} = require('../models/models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const generateJwtToken = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res) {
        const {email, password, username, role} = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, password, and email are required" });
        }
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" }); 
        }
        const hashedPassword = await bcrypt.hash(password, 10);
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
        const user = await User.findOne({where: {email: email}})
        if (!user){
            return res.status(404).json( {message: "Пользователь не найден" });
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword){
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
}

module.exports = new UserController();



    /**
     * 
     *    async check(req, res, next) {
        const token = generateJwtToken(req.user.id, req.user.email);
        return res.json({token});
    }
     */
