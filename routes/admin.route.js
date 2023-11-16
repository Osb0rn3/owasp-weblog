const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Post = require('../models/post.model')

router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/users', async (req, res) => {
    res.send(await User.findAll({}))
})

router.get('/posts', async (req, res) => {
    res.send(await Post.findAll({}))
})

router.delete('/posts/:id', async (req, res) => {
    await Post.destroy({
        where: {
            id: req.params.id
        }
    })

    res.send({ "message": "Post was deleted successfully!" })
})

router.delete('/users/:id', async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })

    res.send({ "message": "User was deleted successfully!" })
})

router.get('/users/:id', async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    res.render('edit-user', { user })
})

router.post('/users/:id', async (req, res) => {
    await User.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )

    res.redirect('/admin')
})

module.exports = router