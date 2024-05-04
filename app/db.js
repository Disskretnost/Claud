const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './../.env' });



// Создание нового экземпляра Sequelize
const sequelize = new Sequelize(
    'Claud', 
    'postgres', 
    '123',
    {
        dialect: 'postgres',
        host: 'localhost', 
        port: 5432, 
    }
);

module.exports = sequelize;