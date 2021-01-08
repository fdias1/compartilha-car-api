const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const Usuario = require('../models/Usuario')

const auth = async (req,res,next) => {
    try {
        const checkToken = jwt.verify(req.headers.token,secret)
        if(req.headers.token && checkToken) {
            next()
        } else {
            res.status(403).send('unauthorized')
        }
    } catch (err) {
        res.status(403).send('unauthorized')
    }
}

const getToken = user => {
    const token = jwt.sign(user,secret)
    return token
}

module.exports = {getToken,auth}