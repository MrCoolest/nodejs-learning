const fs = require('fs')

// Sycnronous call
// fs.writeFileSync('./test.txt','Hey World');


// Asyncrounous call
// fs.writeFile('./test.txt',"Heloo World Async",(err)=> `Something is wrong ${err}`)


// Asyncrounous call
// fs.readFile("./contact.txt","utf-8",(err,res)=>{
//     if(err){
//         console.log('err',err);
//     }else{
//         console.log('Async',res);
//     }
// })



// // Scyncrounous call
// const readValue = fs.readFileSync('./contact.txt','utf-8');
// console.log('sync',readValue);


// // Scyncrounous call
// fs.appendFileSync("./test.txt", new Date().toLocaleString()+'\n');


fs.copyFileSync("./test.txt",'./copy.txt')

// fs.unlinkSync('./copy.txt')

console.log(fs.statSync('./test.txt'))