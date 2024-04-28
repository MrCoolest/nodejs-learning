const express = require('express');
const URL = require('../models/url');
const { getUser } = require('../service/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    let user = req.user;
    let allUrls = null;
    if (user) allUrls = await URL.find({createdBy:user._id});
    if (!user){
        const user_uid = req.cookies?.uid;
        user = getUser(user_uid);
        if (user) allUrls = await URL.find({createdBy:user._id});
    }
    return res.render('home', { urls: allUrls });
});


router.get('/signup', async (req, res) => {
    return res.render('signup');
});

router.get('/login', async (req, res) => {
    return res.render('login');
});


module.exports = router