const express = require('express')
const router = express.Router()
const Anime = require('../model/anime')

router.get('/', async(req, res) => {
    try {
        
        const animex = await Anime.find()
        res.json(animex)
        
    } catch(err) {
        
        res.send('Error ' + err)

    }
})


router.get('/:id', async(req, res) => {
    try {
        
        const anime = await Anime.findById(req.params.id)
        res.json(anime)
        
    } catch(err) {
        
        res.send('Error ' + err)

    }
})


router.post('/', async(req, res) => {
    const anime = new Anime({
        title: req.body.title,
        gender: req.body.gender,
        seasons: req.body.seasons
    })

    try {
        const a1 = await anime.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }


})

router.put('/:id', async(req, res) => {

 //   const id = 


    
    
})

router.delete('/:id', async(req,res) => {

    try {
        const removedPost = await anime.remove({_id: req.params.id})
        res.json(removedPost)
    } catch (err) {
        res.send(err)
    }
    
})


module.exports = router
