const express = require('express')
const router = express.Router()

const Carro = require('../models/Carro')
const Usuario = require('../models/Usuario')
const Registro = require('../models/Registro')

router.use(async(req,res,next) => {
    try {
        if (req.headers['admin-password'] == process.env.ADMIN_PASSWORD) {
            next()
        } else {
            res.status(403).send('Não autorizado')
        }
    } catch (err) {
        res.status(400).send('Ocorreu um erro, tente novamente')
    }
})

router.delete('/clear',async (req,res,next) => {
    await Usuario.deleteMany()
    await Carro.deleteMany()
    await Registro.deleteMany()

    res.status(200).send('Base de dados apagada')
})

router.get('/command',async (req,res,next) => {
    await Usuario.updateMany({},{carros:[]})
    //await Carro.deleteMany()

    res.status(200).send('comando executado')
})
module.exports = router