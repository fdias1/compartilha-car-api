const Registro = require('../models/Registro')

const {succesfulResponse,failiureResponse} = require('../utils/apiResponse')
const crud = require('../utils/crud')(Registro)
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

// ------------------ Balance ---------------------------
router.post('/balance',async (req,res,next) => {
    try {
        const { carro, usuario } = req.body
        const registros = await Registro.find({carro,ativo:true})
        // atribuir totais
        const listGasTotal = registros.filter(registro => registro.tipo === 'gas')
        const listKmTotal = registros.filter(registro => registro.tipo === 'km')
        const gasTotal = listGasTotal.reduce((sum,registro) => sum + registro.valor,0)
        const kmTotal = listKmTotal.reduce((sum,registro) => sum + registro.valor,0)

        if (kmTotal == 0 || gasTotal == 0) throw 'Não é possível fechar o saldo'
        const rate = gasTotal / kmTotal

        // distribuir aos usuarios
        const users = Array.from(new Set(registros.map(registro => registro.usuario.toString())))
        const balanceList = users.map((user) => {
            userGasTotal = listGasTotal.filter(registro => registro.usuario == user).reduce((sum,registro) => sum + registro.valor,0)
            userKmTotal = listKmTotal.filter(registro => registro.usuario == user).reduce((sum,registro) => sum + registro.valor,0)
            const balance = -userKmTotal * rate +userGasTotal
            const userBalance = {user,balance,gas:userGasTotal,km:userKmTotal}
            return userBalance
        })
        console.log(balanceList)
        for (let item of balanceList) {
            console.log(item)
            await crud.create({
                valor:item.balance,
                autor:usuario,
                usuario:item.user,
                carro:carro,
                tipo:'balance'
            })
        }
        const idRegistros = registros.map(registro => registro._id)
        await Registro.updateMany({_id:{$in:idRegistros}},{ativo:false})
        res.status(200).send(succesfulResponse(idRegistros))

    } catch (err) {
        res.status(400).send(failiureResponse(err))
    }
})
module.exports = router