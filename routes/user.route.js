const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

router.get('/profile', async (req, res) => {
    const { token } = req.cookies
    const secretKey = 'your_secret_key';

    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            console.log({decoded})
            if (decoded) {
                const user = await User.findOne({
                    where: {
                        email: decoded.email
                    }
                })

                console.log({user})

                if (user) {
                    res.render('profile', { user: { name: user.firstName, email: user.email } })
                } else {
                    res.redirect("/auth/login")
                }
            }
        } catch (error) {
            console.log(error)
            res.redirect("/auth/login")
        }
    } else {
        res.redirect("/auth/login")
    }
})

module.exports = router