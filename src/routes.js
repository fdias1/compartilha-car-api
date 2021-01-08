const express = require('express') 
const routes = express.Router()

const usuarios = require('./controllers/usuarios')
const carros = require('./controllers/carros')
const registros = require('./controllers/registros')
const admin = require('./controllers/admin.js')

routes.use('/admin',admin)
routes.use('/usuarios',usuarios)
routes.use('/carros',carros)
routes.use('/registros',registros)

module.exports = routes