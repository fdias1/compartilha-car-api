const express = require('express')
const router = express.Router()

const Carro = require('../models/Carro')
const Usuario = require('../models/Usuario')
const Registro = require('../models/Registro')

router.delete('/clear',async (req,res,next) => {
    await Usuario.deleteMany()
    await Carro.deleteMany()
    await Registro.deleteMany()

    res.status(200).send('Base de dados apagada')
})

module.exports = router