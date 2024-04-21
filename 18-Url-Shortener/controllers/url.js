
const shortid = require('shortid');
const URL = require('../models/url');

async function generateShortUrl(req,res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'Url is required' });
    const shortId = shortid()

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    })

    return res.json({ id: shortId });
}
async function getAnlyticsUrl(req,res){
    const shortId = req.params.shortid;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length,analityic:result.visitHistory})
}


module.exports = {
    generateShortUrl,
    getAnlyticsUrl
}