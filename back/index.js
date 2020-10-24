
const express = require('express')
const app = express()
const port = 80
const linkedincallback = require('./linkedincallback.js')

app.use(express.static('../front/build'));

app.get('/linkedincallback', (req, res) => {
    linkedincallback.linkedincallback(req, res);
})

app.listen(port)
