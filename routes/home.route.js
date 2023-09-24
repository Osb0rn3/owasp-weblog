const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

router.get('/', async (req, res) => {
    var users = await User.findAll()

    if (req.query.q) {
        users = await User.findAll({
            where: {
                firstName: req.query.q
            }
        })
    }
    
    res.render('home', { users })
})

module.exports = router