const mongoose = require('mongoose');

async function connectToMongoDB(url){
    return mongoose.connect(url)
    .then(() => { console.log("MongoDB Connected") })
    .catch(err => console.log('Errr in mongoose connection', err));
}

module.exports = {
    connectToMongoDB,
}