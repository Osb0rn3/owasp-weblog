const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize-connect')

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {         // User hasMany WorkingDays n:n
            model: 'Users',
            key: 'id'
        }
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

module.exports = Post