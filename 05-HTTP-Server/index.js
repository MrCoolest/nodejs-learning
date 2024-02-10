const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    // console.log('New Req Rec.');
    // console.log(req)
    const log = `${Date.now()}: New Request received ${req.url} \n`;
    fs.appendFile('log.txt', log, (err, data) => {
        // res.end("Hello From Server");
        switch(req.url){
            case '/':res.end("HomePage");
            break;
            case '/about': res.end("I am Ankit Patwa");
            break;
            default: res.end('This Page is Not Found 404');
            break;
                
        }
    })
});


myServer.listen(8000, () => console.log("Server Started"));