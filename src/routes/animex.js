const express = require('express')
const router = express.Router()
const Anime = require('../model/anime')
const Anime_controller = require('../controllers/anime')

router.get('/', Anime_controller.anime_return)
router.get('/:id', Anime_controller.anime_details)
router.post('/', Anime_controller.anime_create)
router.put('/:id', Anime_controller.anime_update)
router.delete('/:id', Anime_controller.anime_delete)

module.exports = router
