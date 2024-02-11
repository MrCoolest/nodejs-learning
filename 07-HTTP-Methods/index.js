const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    // console.log('New Req Rec.');
    // console.log(req)
    const log = `${Date.now()}: New Request received ${req.url}: Request Method ${req.method} \n`;
    const myUrl = url.parse(req.url, true)
    console.log(myUrl)
    fs.appendFile('log.txt', log, (err, data) => {
        // res.end("Hello From Server");
        switch (myUrl.pathname) {
            case '/':
                if (req.method === 'GET')
                    res.end("HomePage");
                break;
            case '/about':
                console.log(myUrl.query.name)
                res.end("I am Ankit Patwa");
                break;
            case '/signup':
                if (req.method === 'GET') {
                    res.end("This is SignUp Page")
                } else if (req.method === "POST") {
                    res.end('Success')
                }
            default: res.end('This Page is Not Found 404');
                break;

        }
    })
});


myServer.listen(8000, () => console.log("Server Started"));