const express= require('express')
const DBconnect = require('./config/Dbconnect')
const dotenv = require('dotenv')
const authRouter = require('./route/authRoute')
const cors = require('cors')

dotenv.config()
const app= express()
app.use(cors());
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api/auth',authRouter)


app.get('/',async(req,res)=>{
    console.log('welcom to chat app')
    res.send('welcom to chat app')
})

DBconnect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on ${PORT}`)
    })
}).catch((err)=>{
    console.log(err,"err while connecting to db")
})