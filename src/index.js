const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/animex'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('conectado')
})

app.use(express.json())

const animexRouter = require('./routes/animex')
app.use('/animex', animexRouter)

app.listen(3000, () => {
    console.log('Servidor arrancado')
})
