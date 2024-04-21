const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url')
const URL = require('./models/url')
const app = express()
const PORT = 8001



// DB Connection
connectToMongoDB('mongodb://localhost:27017/short-url')

// middleware

app.use(express.json());

// Routes
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })

    res.redirect(entry.redirectUrl);
})

// app Running on
app.listen(PORT, () => console.log("Server Started at", PORT))