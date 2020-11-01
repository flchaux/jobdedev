
const eventManager = require('./eventManager.js')

exports.handle = function(req, res){
    if(!req.body.token){
        res.status(401).send(JSON.stringify({success: false, error: 'You must provide a valid token'}))
        return;
    }
    const startDate = new Date(req.body.start)
    eventManager.create(req.body.token, startDate).then((result) => {
        res.send(JSON.stringify({success: result.success}))
    }).catch((exception) => {
        console.log(exception)
        res.send(JSON.stringify({success: false, error: exception}))
    })
}