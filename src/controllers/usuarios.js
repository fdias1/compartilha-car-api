const Usuario = require('../models/Usuario')

const auth = require('../utils/auth')
const {succesfulResponse,failiureResponse} = require('../utils/apiResponse')
const crud = require('../utils/crud')(Usuario)
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

router.get('/',auth.auth,async (req,res) => {
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

router.get('/:id',auth.auth,async (req,res) => {
    try {
        const data = await crud.readOne(req.params.id)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.put('/:id',auth.auth,async (req,res) => {
    try {
        const data = await crud.update(req.params.id,req.body)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.delete('/:id',auth.auth,async (req,res) => {
    try {
        const data = await crud.del(req.params.id)
        res.status(200).send(succesfulResponse(data))
    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})

router.post('/login',async (req,res,next) => {
    const { email, senha } = req.body
    const usuario = await Usuario.findOne({email})

    if (!usuario || usuario.senha !== senha) {
        res.status(400).send(failiureResponse('Email não cadastrado ou senha incorreta'))
        return
    }
    const userObject = {
        nome:usuario.nome,
        sobrenome:usuario.sobrenome,
        email:usuario.email,
        id:usuario._id,
        carros:JSON.stringify(usuario.carros),
    }
    userObject.token = auth.getToken({usuario:usuario._id})
    res.status(200).send(succesfulResponse(userObject))
})

module.exports = router