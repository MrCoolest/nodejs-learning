const express = require("express");
const fs = require('fs');
const {connectMongoDB} = require('./conntection');
const middleware = require('./middleware')
const userRoute = require('./routers/users')
const app = express()
const PORT = 8000;



// Connection
connectMongoDB('mongodb://localhost:27017/youtube-app-1');

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(middleware.logReqRes('log.txt'));

// Routes 
app.use('/api/users',userRoute);



// App running
app.listen(PORT, () => console.log(`Server Started at Ports ${PORT}`))

