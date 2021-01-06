const express = require('express') 
const routes = express.Router()

const usuarios = require('./controllers/usuarios')
const carros = require('./controllers/carros')
const registros = require('./controllers/registros')
const admin = require('./utils/admin.js')
const auth = require('./utils/auth')
const router = require('./controllers/carros')

routes.use('/admin',admin)
routes.use('/usuarios',usuarios)
routes.use(auth.auth)
routes.use('/carros',carros)
routes.use('/registros',registros)

module.exports = routes