const express = require('express');
const { generateShortUrl, getAnlyticsUrl } = require('../controllers/url');

const router = express.Router();

router.post('/',generateShortUrl);
router.get('/anlyticurl/:shortid',getAnlyticsUrl);


module.exports = router