const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require ('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId/thouhgts/friends').get(getUserById);

router.route('/:userId/thoughts/:thoughtId').delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;