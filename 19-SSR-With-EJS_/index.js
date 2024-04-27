const express = require('express');
const path = require('path')
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const URL = require('./models/url')
const app = express()
const PORT = 8001



// DB Connection
connectToMongoDB('mongodb://localhost:27017/short-url')

// set  views
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/url', urlRoute);
app.use('/', staticRouter);

// app.get('/:shortId', async (req, res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId
//     }, {
//         $push: {
//             visitHistory: { timestamp: Date.now() }
//         }
//     })

//     res.redirect(entry.redirectUrl);
// })


// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.end(`
//     <html>
//     <head> <head>
//     <body> 
//         <ol>
//         ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`)}
//         <ol>
//     </body>
//     </html>
//     `)
// })



// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home',{'urls':allUrls});
// })



// app Running on
app.listen(PORT, () => console.log("Server Started at", PORT))