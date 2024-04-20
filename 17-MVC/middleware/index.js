const fs = require('fs');

function logReqRes(filename){
    return (req, res, next) => {

        console.log('Hello From middleware 1')
        // return res.json({msg:"Heellloo"})
        fs.appendFile(filename, `${Date.now()}: ${req.method}: ${req.path}`, (err, data) => {
            next();
        })
        next();
    }
}

module.exports = {logReqRes};