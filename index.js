require('dotenv').config()
const cors = require('cors')
const { json } = require('body-parser')
const express = require('express')
const routes = require('./src/routes')
const port = process.env.PORT || 3000
const app = express()
require('./src/services/database')

app.use(cors({origin:true}))
app.use(json())
app.use(routes)

app.listen(port,() => console.log('backend online, PORT: ',port))