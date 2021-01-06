const mongoose = require('mongoose')

const triggers = require('../utils/triggers')
const usuarioSchema = new mongoose.Schema({
    nome:{type:String,required:true},
    sobrenome:{type:String,required:true},
    email:{type:String,unique:true,required:true,lowercase:true},
    senha:{type:String,required:true},
    carros:{type:[mongoose.Types.ObjectId],default:[],required:true},
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

//console.log(Usuario,Carro)
module.exports = Usuario