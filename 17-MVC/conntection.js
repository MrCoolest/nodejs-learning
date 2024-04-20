const mongoose = require('mongoose');


// Connection
async function connectMongoDB (url){
    // mongoose.connect('mongodb://localhost:27017/youtube-app-1')
    mongoose.connect(url)
    .then(() => { console.log("MongoDB Connected") })
    .catch(err => console.log('errr in mongoose connection', err))
}

module.exports = {
    connectMongoDB
}


