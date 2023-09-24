const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const ResetPassword = require('../models/reset-password.model')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailgun = require('../email/mailgun')

function generateResetToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                const token = buffer.toString('hex');
                resolve(token);
            }
        });
    });
}

router.get('/login', (req, res) => {
    res.render('login') // ./views/login.ejs
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/forget-password', (req, res) => {
    res.render('forget-password')
})

router.get('/forget-password/:token', (req, res) => {
    res.render('password-change', { token: req.params.token })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const secretKey = 'your_secret_key';

    const user = await User.findOne({
        where: {
            email
        }
    })

    if (user) {
        if (user.password == password) {
            const payload = {
                "id": user._id,
                "email": user.email
            }

            const token = jwt.sign(payload, secretKey, {
                expiresIn: '3h',
            });

            res.cookie('token', token, {
                maxAge: 3 * 60 * 60 * 1 * 1000,
                path: '/'
            })
            res.redirect("/user/profile")
        } else {
            res.render('login', { "errorMessage": "The password is incorrect!" })
        }
    } else {
        res.render('login', { "errorMessage": "User not found!" })
    }
})

router.post('/register', async (req, res) => {
    const { email, password, firstname, lastname } = req.body

    const user = await User.findOne({
        where: {
            email
        }
    })

    if (user) {
        res.render('register', { "errorMessage": "User already exists!" })
    } else {
        const user = await User.create({
            lastName: lastname,
            firstName: firstname,
            password,
            email
        })

        res.redirect('/auth/login')
    }
})

router.post('/forget-password', async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({
        where: {
            email
        }
    })

    if (user) {
        const token = await generateResetToken()

        await ResetPassword.create({
            email,
            token
        })

        try {
            await mailgun.messages.create('sandbox76e52da8147d4b5aaef6e3fe5d428cde.mailgun.org', {
                from: "Amir <mailgun@sandbox76e52da8147d4b5aaef6e3fe5d428cde.mailgun.org>",
                to: [email],
                subject: "Reset Password",
                text: `Reset your password with the following link: http://owasp.com:3000/auth/forget-password/${token}`,
                html: ''
            })
        } catch (error) {
            console.log(error)
        }

        res.redirect('/auth/login')
    } else {
        res.redirect('/auth/login')
    }
})

router.post('/forget-password/:token', async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const reset_password = await ResetPassword.findOne({
        where: {
            token
        }
    })

    if (reset_password) {
        const user = await User.findOne({
            where: {
                email: reset_password.email
            }
        })

        if (user) {
            user.password = password
            await user.save()

            res.redirect('/auth/login')
        } else {
            res.redirect('/auth/login')
        }
    } else {
        res.redirect('/auth/login')
    }
})


module.exports = router