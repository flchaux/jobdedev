
const express = require('express')
const path = require('path')
const app = express()
const port = 80
const linkedincallback = require('./linkedincallback.js')
const bodyParser = require('body-parser')
const eventHandler = require('./eventHandler.js')

const frontDir = path.join(__dirname, '../front/build');

//app.use(express.static('../front/build'));
app.use('/static', express.static(frontDir))
app.use(bodyParser.json())

app.get('/linkedincallback', (req, res) => {
    linkedincallback.linkedincallback(req, res);
})

app.post('/event', function(req, res){
    eventHandler.handle(req, res)
})

app.get('/', function(req, res) {
    res.sendFile(path.join(frontDir, 'index.html'));
});

app.listen(port)
