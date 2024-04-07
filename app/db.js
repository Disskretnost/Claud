const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создание нового экземпляра Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, // Используйте DB_NAME для имени базы данных
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
);

module.exports = sequelize;