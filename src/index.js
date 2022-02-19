const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://Alvaro:passwordAlvaro@aniimex.5yqpe.mongodb.net/Aniimex?retryWrites=true&w=majority'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('conectado')
})

app.use(express.json())

const animexRouter = require('./routes/routes')
app.use(animexRouter)

app.listen(3000, () => {
    console.log('Servidor arrancado')
})
