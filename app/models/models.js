const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE},
});