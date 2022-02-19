const express = require('express')
const router = express.Router()
const Anime = require('../model/anime_model')
const controller = require('../controllers/controller')

//Anime
router.get('/animes', controller.animeReturn)
router.get('/anime/:id', controller.animeDetails)
router.get('/animeTitulo/:title', controller.animeTitle)
router.get('/animeSeasons/:seasons', controller.animeSeasons)
router.post('/addAnime/', controller.animeCreate)
router.put('/updateAnime/:id', controller.animeUpdate)
router.delete('/deleteAnime/:id', controller.animeDelete)

//User
router.get('/users', controller.userReturn)
router.get('/user/:id', controller.userDetails)
router.post('/addUser', controller.userCreate)
router.put('/updateUser/:id', controller.userUpdate)
router.delete('/deleteUser/:id', controller.userDelete)

module.exports = router
