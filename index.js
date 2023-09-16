const express = require('express')
const birdsRoute = require('./routes/birds.route')
const sequelize = require('./database/sequelize-connect')
const User = require('./models/user.model')

const app = express()
const port = 3000
app.use(express.json())

app.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users)
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    console.log({ email })

    const user = await User.findOne({
        where: {
            email
        }
    })

    console.log(user)

    if (user) {
        if (user.password == password) {
            res.send("Hi to panel")
        } else {
            res.send("The password is incorrect!")
        }
    } else {
        res.send("User not found!")
    }
})

app.get('/create-user', async (req, res) => {
    const user = await User.create({ firstName: "Jane", lastName: "Doe", email: 'info@owasp.com', password: 'admin123' });
    res.send(user)
})

// app.use('/birds', birdsRoute)

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        console.log(`Example app listening on port ${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})