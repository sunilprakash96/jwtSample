const service = require('../services/jwt.service')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await service.getUser(email)
        if (user.password === password) {
            const token = await jwt.sign(user, "pass", { expiresIn: '2m' })
            res.status(200).send(token)
        }
        else {
            res.status(401).send({ message: "Unauthorized" })
        }
    }
    catch {
        res.status(500).send({ message: "Login: Internal Server Error"})
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

const auth = (req, res, next) => {
    const token = req.headers['token']
    if(!token) {
        return res.status(401).send({ message: 'Acces Denied' })
    }
    try {
        jwt.verify(token, 'pass')
        next()
    } catch (e) {
        res.status(401).send({ message: 'Unauthorized' })
    }
}

module.exports = {
    login,
    getUser,
    auth
}