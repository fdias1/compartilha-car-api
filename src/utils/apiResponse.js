const succesfulResponse = retorno => ({ok:true,retorno,mensagem:null})
const failiureResponse = err => ({ok:false,retorno:null,mensagem:err})

module.exports = {succesfulResponse,failiureResponse}