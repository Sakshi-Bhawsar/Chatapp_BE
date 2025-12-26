const express = require("express")
const { chats } = require("./data/data")
const app = express()

app.get("/",(req,res)=>{
    res.send(chats)
})


app.listen(5000,()=>{
    console.log("app listen on port 5000")
})