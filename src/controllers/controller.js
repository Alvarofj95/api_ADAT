const Anime = require('../model/anime_model');
const User = require('../model/user_model')

//
// ANIME
//

//Get todo
exports.animeReturn = function(req, res) {
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
exports.animeDetails = (req, res) => {
    Anime.findById(req.params.id)
    .then(data => {
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Anime no encontrado por el id: " + req.params.id
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
                message: "Anime no encontrado por el id: " + req.params.id
            })
        }
        return res.status(500).send({
            success: false,
            message: "Error interno en el Anime con id: " + req.params.id
        })
    })
}

//Post
exports.animeCreate = function(req, res) {
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

//Put-update
exports.animeUpdate = (req, res) => {
    //validar el request
    if(!req.body.title || !req.body.gender || !req.body.seasons){
        return res.status(400).send({
            success:false,
            message: "Introduzca correctamente los datos"
        })
    }
    //Encontrar el Anime y modificarlo
    Anime.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data){
                return res.status(404).send({
                    success: false, 
                    message: "Anime no encontrado con el id: " + req.params.id
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
                    message: "El Anime no se encuentra con ese id: " + req.params.id
                })
            }
            return res.status(500).send({
                success: false, message: "Error en la modificacion del Anime con ese id: " + req.params.id
            })
        })
}

//Eliminar un Anime con id especifico
exports.animeDelete = (req, res) => {
    Anime.findByIdAndRemove(req.params.id)
        .then(data =>{
            if(!data){
                return res.status(404).send({
                    success: false,
                    message: "El Anime no se encuentra con ese id: " + req.params.id
                })
            }
            res.send({
                success: true,
                message: "El Anime se ha eliminado correctamente"
            })
        }).catch(err => {
            if(err.kind == 'ObjectId' || err.name === 'NotFound'){
                return res.status(404). send({
                    success: false,
                    message: "Anime no encontrado donde id: " + req.params.id
                })
            }
            return req.status(500).send({
                success: false,
                message: "No se ha podido eliminar el Anime con id: " + req.params.id
            })
        })
}

//
// USUARIOS
//

//Get todo
exports.userReturn = function(req, res) {
    User.find()
    .then(data => {
        var message = "";
        if (data === undefined || data.length == 0) message = "no hay usuarios"
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
exports.userDetails = (req, res) => {
    User.findById(req.params.id)
    .then(data => {
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Usuario no encontrado por el id: " + req.params.id
            })
        }
        res.send({
            success: true,
            message: "Usuario obtenido correctamente",
            data: data
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Usuario no encontrado por el id: " + req.params.id
            })
        }
        return res.status(500).send({
            success: false,
            message: "Error interno en Usuario con id: " + req.params.id
        })
    })
}

//Post
exports.userCreate = function(req, res) {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({

            success: false,
            message: "Tiene que introducir los tres valores para procesar"
        })
    }
    let user = new User({
        email: req.body.email,
        password: req.body.password
    })

    //grabar los datos
    user.save()
    .then(data => {
        res.send({
            success: true,
            message: "Creado usuario correctamente",
            data: data
        })
    })

}

//Put-update
exports.userUpdate = (req, res) => {
    //validar el request
    if(!req.body.email || !req.body.password){
        return res.status(400).send({
            success:false,
            message: "Introduzca correctamente los datos"
        })
    }
    //Encontrar el usuario y modificarlo
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data){
                return res.status(404).send({
                    success: false, 
                    message: "Usuario no encontrado con el id: " + req.params.id
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
                    message: "El usuario no se encuentra con ese id: " + req.params.id
                })
            }
            return res.status(500).send({
                success: false, message: "Error en la modificacion del Usuario con ese id: " + req.params.id
            })
        })
}

//Eliminar un usuario con id especifico
exports.userDelete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(data =>{
            if(!data){
                return res.status(404).send({
                    success: false,
                    message: "El usuario no se encuentra con ese id: " + req.params.id
                })
            }
            res.send({
                success: true,
                message: "El usuario se ha eliminado correctamente"
            })
        }).catch(err => {
            if(err.kind == 'ObjectId' || err.name === 'NotFound'){
                return res.status(404). send({
                    success: false,
                    message: "Usuario no encontrado donde id: " + req.params.id
                })
            }
            return req.status(500).send({
                success: false,
                message: "No se ha podido eliminar el usuario con id: " + req.params.id
            })
        })
}