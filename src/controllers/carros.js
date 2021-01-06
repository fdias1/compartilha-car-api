const Carro = require('../models/Carro')
const Usuario = require('../models/Usuario')

const {succesfulResponse,failiureResponse} = require('../utils/apiResponse')
const crud = require('../utils/crud')(Carro)
const express = require('express')
const router = express.Router()

router.post('/',async (req,res) => {
    try {
        const data = await crud.create(req.body)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.get('/',async (req,res) => {
    try {
        let data
        if (req.query) {
            data = await crud.readQuery(req.query)
        } else {
            data = await crud.readAll()
        }
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.get('/:id',async (req,res) => {
    try {
        const data = await crud.readOne(req.params.id)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.put('/:id',async (req,res) => {
    try {
        const data = await crud.update(req.params.id,req.body)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const data = await crud.del(req.params.id)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

// ---------------------------- Funcionalidades específicas

router.get('/util/atrelar', async (req,res) => {
    try {
        const { usuario, placa, pin } = req.query
        const carro = await Carro.findOne({placa})
        if (carro) {
            if (carro.pin === pin) {
                if(carro.usuarios.indexOf(usuario) < 0) {
                    carro.usuarios.push(usuario)
                    await Carro.findOneAndUpdate({placa},{usuarios:carro.usuarios})
                    res.status(200).send(succesfulResponse(carro))
                } else {
                    throw 'Relação ja existente'
                }
            } else {
                throw 'PIN incorreto'
            }
        } else {
            throw 'Carro não encontrado'
        }
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.get('/util/desatrelar', async (req,res,next) => {
    try {
        const usuarioId = req.query.usuario
        const carroId = req.query.carro 

        const usuario = await Usuario.findById(usuarioId)
        const carros = usuario.carros
        
        const carro = await Carro.findById(carroId)
        const usuarios = carro.usuarios
        
        if( carros.indexOf(carroId) < 0 || usuarios.indexOf(usuarioId) < 0) {
            throw 'Relação inexistente'
        } else {
            usuarios.splice(usuarios.indexOf(usuarioId),1)
            carros.splice(carros.indexOf(carroId),1)
            
            await usuario.updateOne({carros})
            await carro.updateOne({usuarios})

            const newCarro = await Carro.findById(carroId)
            res.status(200).send(succesfulResponse(newCarro))
        }
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

module.exports = router