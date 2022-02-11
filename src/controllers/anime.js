const Anime = require('../model/anime');

//Post
exports.anime_create = function(req, res) {
    if(!req.body.title || !req.body.gender || !req.body.seasons){
        return res.status(400).send({

            success: false,
            message: "Tiene que introducir los tres valores para procesar"
        })
    }
    let anime = new Anime({
        title: req.body.title,
        gender: req.body.gender,
        seasons: req.body.seasons
    })

    //grabar los datos
    anime.save()
    .then(data => {
        res.send({
            success: true,
            message: "Creado anime correctamente",
            data: data
        })
    })

}

//Get todo
exports.anime_return = function(req, res) {
    Anime.find()
    .then(data => {
        var message = "";
        if (data === undefined || data.length == 0) message = "no hay animes"
        else message = "Se han procesado los datos correctamente"
        
        res.send({
            success: true,
            message: message,
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "ha ocurrido un error mientras se procesaban los datos"
        })
    })
}

//Get concreto
exports.anime_details = (req, res) => {
    Anime.findById(req.params.id)
    .then(data => {
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Producto no encontrado por el id: " + req.params.id
            })
        }
        res.send({
            success: true,
            message: "Anime obtenido correctamente",
            data: data
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Producto no encontrado por el id: " + req.params.id
            })
        }
        return res.status(500).send({
            success: false,
            message: "Error interno en el producto con id: " + req.params.id
        })
    })
}

//Put-update
exports.anime_update = (req, res) => {
    //validar el request
    if(!req.body.title || !req.body.gender || !req.body.seasons){
        return res.status(400).send({
            success:false,
            message: "Introduzca correctamente los datos"
        })
    }
    //Encontrar el producto y modificarlo
    Anime.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data){
                return res.status(404).send({
                    success: false, 
                    message: "Producto no encontrado con el id: " + req.params.id
                })
            }
            res.send({
                success: true,
                data: data
            })
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    success: false,
                    message: "El producto no se encuentra con ese id: " + req.params.id
                })
            }
            return res.status(500).send({
                success: false, message: "Error en la modificacion del producto con ese id: " + req.params.id
            })
        })
}

//Eliminar un producto con id especifico
exports.anime_delete = (req, res) => {
    Anime.findByIdAndRemove(req.params.id)
        .then(data =>{
            if(!data){
                return res.status(404).send({
                    success: false,
                    message: "El producto no se encuentra con ese id: " + req.params.id
                })
            }
            res.send({
                success: true,
                message: "El producto se ha eliminado correctamente"
            })
        }).catch(err => {
            if(err.kind == 'ObjectId' || err.name === 'NotFound'){
                return res.status(404). send({
                    success: false,
                    message: "Producto no encontrado donde id: " + req.params.id
                })
            }
            return req.status(500).send({
                success: false,
                message: "No se ha podido eliminar el producto con id: " + req.params.id
            })
        })
}