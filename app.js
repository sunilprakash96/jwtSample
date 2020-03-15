const express = require('express')
const routes = require('./routes/index')

const app = express()

app.use('/api', routes)

app.listen(3000, () =>  "Running On 3000" )