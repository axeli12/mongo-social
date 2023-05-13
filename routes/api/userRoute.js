const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
} = require ('../../controllers/userController.js');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendsId').post(addFriend);

module.exports = router;