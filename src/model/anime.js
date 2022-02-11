const mongoose = require('mongoose')


const animeSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    seasons: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Anime', animeSchema)