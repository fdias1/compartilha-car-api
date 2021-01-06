const mongoose = require('mongoose')

const registroSchema = new mongoose.Schema({
    valor:{type:Number,required:true},
    tipo:{type:String,enum:['gas','km','balance'],required:true,lowercase:true},
    usuario:{type:mongoose.Types.ObjectId, required:true},
    carro:{type:mongoose.Types.ObjectId, required:true},
    autor:{type:mongoose.Types.ObjectId, required:true},
    data:{type:Date,default:new Date(), required:true},
    ativo:{type:Boolean,required:true,default:true},
    balance:{type:mongoose.Types.ObjectId},
})

const Registro = mongoose.model('Registro', registroSchema)

module.exports = Registro