const fs = require("fs");
const os = require("os");

console.log('os',os.cpus().length)

console.log("1");
// Blocking
const result = fs.readFileSync("contact.txt","utf-8")
console.log(result);

// Non-blocking
fs.readFile('contact.txt','utf-8',(err,result)=>{
    console.log('Non Blocking \n',result);
})

console.log("2");


