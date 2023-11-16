const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize-connect')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        require: true,
        set(value) {
            this.setDataValue('email', value ? value.toLowerCase() : '');
        }
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        require: true,
        set(value) {
            this.setDataValue('username', value ? value.toLowerCase() : '');
        }
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user'
    }
}, {});

User.sync().then(async () => {
    const user = await User.findOne({
        where: {
            email: 'admin@owasp.com'
        }
    })

    if (!user) {
        await User.create({
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@owasp.com',
            password: '1234',
            username: 'admin',
            role: 'admin'
        })
    }
})

module.exports = User