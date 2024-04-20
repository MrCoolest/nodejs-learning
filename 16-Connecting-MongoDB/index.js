const express = require("express");
const fs = require('fs');
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');
const { type } = require("os");


const app = express()
const PORT = 8000;

// Connection
mongoose.connect('mongodb://localhost:27017/youtube-app-1')
    .then(() => { console.log("MongoDB Connected") })
    .catch(err => console.log('errr in mongoose connection', err))

// Schema 
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    }
})


const User = mongoose.model("user", userSchema )


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {

    console.log('Hello From middleware 1')
    // return res.json({msg:"Heellloo"})
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}`, (err, data) => {
        next();
    })
    // next();
});

app.get('/api/users', async (req, res) => {
    const users = await User.find({})
    return res.status(202).json(users);
})

// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id);
//     return res.json(user);
// })

app
    .route('/api/users/:id')
    .get(async (req, res) => {
        console.log('headers', req.headers);
        // Custom Header (according to Conventions Dev use X in custom Heades)
        res.setHeader('X-MyName', 'Ankit');
        const id = req.params.id;
        // const user = users.find((user) => user.id === id);
        const user = await User.findById(id)
        return res.json(user);
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id);
        console.log('deleted',result);
        // const users2 = users.filter((user) => user.id !== id);

        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users2), (err, data) => {
        //     return res.json({ status: "success" });

        // })
        return res.json({msg:'Success'})
    })
    .patch((req, res) => {
        const id = req.params.id;
        const body = req.body;
        let current_user = false
        console.log('id', id, body)
        let users2 = users.map((user) => {
            if (user.id === id) {
                user['first_name'] = body.first_name ? body.first_name : user.first_name
                user['last_name'] = body.last_name ? body.last_name : user.last_name
                user['email'] = body.email ? body.email : user.email
                user['gender'] = body.gender ? body.gender : user.gender
                user['job_title'] = body.job_title ? body.job_title : user.job_title
                current_user = user;
            }
            return user;
        });
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users2), (err, data) => {
            return res.json({ status: "success", current_user });

        })
    });

app.roture



app.post('/api/users', async (req, res) => {
    // TODO : Create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.jobTitle) {
        return res.sendStatus(400).json({ msg: 'All fields are required!' })
    }
    console.log("Body", body);
    users.push({ id: users.length + 1, ...body });
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "success", id: users.length });

    // })

    const result = await User.create({...body})
    console.log('Result',result);

    return res.status(201).json({msg:'Success'})
});


// app.patch('/api/users/:id', (req, res) => {
//     // TODO : update the user with ID
//     return res.json({ status: "pending" });
// });







app.get('/users', async (req, res) => {
    const users = await User.find({});
    console.log("user",users)
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html);
})







app.listen(PORT, () => console.log(`Server Started at Ports ${PORT}`))

