const express = require('express');
const DBconnect = require('./src/config/Dbconnect');
const authRouter = require('./src/route/authRoute');
const userRouter = require('./src/route/userRouter');
const auth = require('./src/middleware/auth');
const app = express();

require('dotenv').config()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use('/auth', authRouter)
app.use('/user', auth, userRouter)

app.get('/', (req, res) => {
    res.send('welcom')
})

DBconnect().then(() => {
    app.listen(PORT, () => {
        console.log(`app is runing on port ${PORT}`)
    })
    console.log("db connected")
}).catch((err) => {
    console.log(err)
})

