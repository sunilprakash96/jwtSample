const service = require('../services/jwt.service')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await service.getUser(email)
        if (user.password === password) {
            const token = await jwt.sign(user, "pass", '5m')
            res.status(200).send(token)
        }
        else {
            res.status(401).send({ message: "Unauthorized" })
        }
    }
    catch {
        res.status(500).send({ message: "Internal Server Error"})
    }
}

const getUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await service.getUser(email)
        res.status(200).send(user)
    }
    catch {
        res.status(500).send({ message: "Internal Server Error"})
    }
}

const auth = async (req, res) => {
    try {
        const [ token ] = req.header
        const isTokenValid = jwt.verify(token , 'pass')
        if(isTokenValid) {
            next()
        }
        else {
            res.status(401).send({ message: "Invalid Token"})
        }
    }
    catch {
        res.status(500).send({ message: "Internal Server Error"})
    }
}

module.exports = {
    login,
    getUser,
    auth
}