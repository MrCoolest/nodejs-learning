const express = require("express");
const fs = require('fs');
const users = require('./MOCK_DATA.json');


const app = express()
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{

    console.log('Hello From middleware 1')
    // return res.json({msg:"Heellloo"})
    fs.appendFile('log.txt',`${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
    // next();
});

app.get('/api/users', (req, res) => {
    return res.status(202).json(users);
})

// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id);
//     return res.json(user);
// })

app
    .route('/api/users/:id')
    .get((req, res) => {
        console.log('headers',req.headers);
        // Custom Header (according to Conventions Dev use X in custom Heades)
        res.setHeader('X-MyName','Ankit');
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .delete((req, res) => {
        const id= Number(req.params.id);
        const users2 = users.filter((user)=>user.id!==id);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users2), (err, data) => {
            return res.json({ status: "success"});
    
        })
    })
    .patch((req, res) => {
        const id= Number(req.params.id);
        const body = req.body;
        let current_user = false
        console.log('id',id,body)
        let users2 = users.map((user) => {
            if(user.id === id){
                user['first_name'] = body.first_name?body.first_name:user.first_name 
                user['last_name'] = body.last_name?body.last_name:user.last_name 
                user['email'] = body.email?body.email:user.email 
                user['gender'] = body.gender?body.gender:user.gender 
                user['job_title'] = body.job_title?body.job_title:user.job_title 
                current_user = user;
            }
            return user;
        });
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users2), (err, data) => {
            return res.json({ status: "success", current_user});
    
        })
    });

app.roture



app.post('/api/users', (req, res) => {
    // TODO : Create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.sendStatus(400).json({msg:'All fields are required!'})
    }
    console.log("Body", body);
    users.push({id:users.length+1,...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success",id:users.length });

    })
});


// app.patch('/api/users/:id', (req, res) => {
//     // TODO : update the user with ID
//     return res.json({ status: "pending" });
// });







app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html);
})







app.listen(PORT, () => console.log(`Server Started at Ports ${PORT}`))

