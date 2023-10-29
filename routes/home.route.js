const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Post = require('../models/post.model')

router.get('/', async (req, res) => {
    var users = await User.findAll()
    const posts = await Post.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']]
    })

    if (req.query.q) {
        users = await User.findAll({
            where: {
                firstName: req.query.q
            }
        })
    }

    res.render('home', {
        users, posts: posts.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                cover: item.cover,
                content: item.content.substring(0, 100) // Create a new 'brief' field with a limited length
            };
        })
    })
})

module.exports = router