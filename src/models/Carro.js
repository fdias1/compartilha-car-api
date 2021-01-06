const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const triggers = require('../utils/triggers')

const carroSchema = new mongoose.Schema({
    apelido:{type:String,required:true},
    placa:{type:String,required:true,unique:true,validate:/^[A-z][A-z][A-z][0-9]([A-z]|[0-9])[0-9][0-9]$/,uppercase:true},
    pin:{type:String,required:true,validate:/^[0-9][0-9][0-9][0-9]$/},
    usuarios:{type:[mongoose.Types.ObjectId],default:[],required:true},
})
carroSchema.post('save',triggers.saveTriggerHandler('usuarios',Usuario,'carros'))
carroSchema.post('findOneAndUpdate',triggers.updateTriggerHandler('usuarios',Usuario,'carros'))
carroSchema.pre('findOneAndDelete',triggers.delTriggerHandler('usuarios',Usuario,'carros'))

const Carro = mongoose.model('Carro', carroSchema)

module.exports = Carro