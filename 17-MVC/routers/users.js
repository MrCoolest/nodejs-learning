const express = require('express');
const { handleGetAllUsers, handleCreateUser, handleGetUserById, handleDeleteUserById, handleUpdateUserById } = require('../controllers/users')
const router = express.Router()

router.get('/', handleGetAllUsers)
router.post('/', handleCreateUser);

router
    .route('/:id')
    .get(handleGetUserById)
    .delete(handleDeleteUserById)
    .patch(handleUpdateUserById);

// router.roture



// router.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id);
//     return res.json(user);
// })

// router.get('/users', async (req, res) => {
//     const users = await User.find({});
//     console.log("user",users)
//     const html = `
//         <ul>
//             ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//         </ul>
//     `
//     res.send(html);
// })


module.exports = router;