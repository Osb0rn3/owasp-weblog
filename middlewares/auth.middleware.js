const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAdmin = async (req, res, next) => {
    const secretKey = 'your_secret_key';
    const { token } = req.cookies

    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);

            if (decoded) {
                const user = await User.findOne({
                    where: {
                        email: decoded.email
                    }
                })

                if (user.role == 'admin') {
                    next();
                } else {
                    res.redirect("/")
                }
                
            } else {
                res.redirect("/auth/login")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/auth/login")
        }
    } else {
        res.redirect("/auth/login")
    }
}

const requireAuth = (req, res, next) => {
    const secretKey = 'your_secret_key';
    const { token } = req.cookies

    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);

            if (decoded) {
                res.locals.decoded = decoded;
                next();
            } else {
                res.redirect("/auth/login")
            }
        } catch (error) {
            console.log(error)
            res.redirect("/auth/login")
        }
    } else {
        res.redirect("/auth/login")
    }
}



module.exports = {
    requireAuth,
    isAdmin
}