const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'user'}, 
});

const File = sequelize.define('file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}},
    name: {type: DataTypes.STRING},
    path: {type: DataTypes.STRING},
    size: {type: DataTypes.INTEGER},
    contentType: {type: DataTypes.STRING},
    originalName: {type: DataTypes.STRING}, // Добавлено оригинальное имя файла
});


User.hasMany(File, {foreignKey: 'userId'});
File.belongsTo(User, {foreignKey: 'userId'});

module.exports = { User, File };
