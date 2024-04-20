const User = require('../models/users')

async function handleGetAllUsers(req, res) {
    const users = await User.find({})
    return res.status(202).json(users);
}


const handleGetUserById = async (req, res) => {
    console.log('headers', req.headers);
    // Custom Header (according to Conventions Dev use X in custom Heades)
    res.setHeader('X-MyName', 'Ankit');
    const id = req.params.id;
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(id)
    return res.json(user);
}

const handleDeleteUserById = async (req, res) => {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    console.log('deleted', result);
    // const users2 = users.filter((user) => user.id !== id);

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users2), (err, data) => {
    //     return res.json({ status: "success" });

    // })
    return res.json({ msg: 'Success' })
}

const handleUpdateUserById = (req, res) => {
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
}

const handleCreateUser = async (req, res) => {
    // TODO : Create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.jobTitle) {
        return res.sendStatus(400).json({ msg: 'All fields are required!' })
    }
    console.log("Body", body);
    // users.push({ id: users.length + 1, ...body });
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "success", id: users.length });

    // })

    const result = await User.create({ ...body })
    console.log('Result', result);

    return res.status(201).json({ msg: 'Success' })
}


module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById
}