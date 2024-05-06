// const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = 'Ankit@@@@####%%%21'


function setUser(user) {
    // return sessionIdToUserMap.set(id,user);

    const payload = {
        ...user,
    };
    return jwt.sign(payload, secret);
}

function getUser(token) {
    // return sessionIdToUserMap.get(id);
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
}