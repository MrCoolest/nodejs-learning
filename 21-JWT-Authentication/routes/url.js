const express = require('express');
const { generateShortUrl, getAnlyticsUrl, handelShortUrl } = require('../controllers/url');

const router = express.Router();

router.post('/',generateShortUrl);
router.get('/anlyticurl/:shortid',getAnlyticsUrl);
router.get('/:shortId',handelShortUrl);


module.exports = router;