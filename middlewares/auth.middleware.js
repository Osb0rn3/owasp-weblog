const jwt = require('jsonwebtoken');

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
    requireAuth
}