
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
        createdBy: req.user._id
    })

    // return res.json({ id: shortId });
    return res.render('home',{ id: shortId });
}
async function getAnlyticsUrl(req,res){
    const shortId = req.params.shortid;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length,analityic:result.visitHistory})
}


const handelShortUrl = async (req, res) => {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortId
        }, {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        })
    
        res.redirect(entry.redirectUrl);
    }

module.exports = {
    generateShortUrl,
    getAnlyticsUrl,
    handelShortUrl
}