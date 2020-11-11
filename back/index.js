
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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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
