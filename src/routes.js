const express = require('express') 
const routes = express.Router()

const usuarios = require('./controllers/usuarios')
const carros = require('./controllers/carros')
const registros = require('./controllers/registros')
const admin = require('./utils/admin.js')
const auth = require('./utils/auth')

routes.use('/admin',admin)
routes.use('/usuarios',usuarios)
routes.use('/carros',auth.auth,carros)
routes.use('/registros',auth.auth,registros)

module.exports = routes