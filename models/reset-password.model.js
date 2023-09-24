const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize-connect')

const ResetPassword = sequelize.define('ResetPassword', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {});

module.exports = ResetPassword