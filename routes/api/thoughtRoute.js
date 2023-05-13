const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
} = require ('../../controllers/thoughtController');
// all thoughts
router.route('/').get(getThoughts).post(createThought);
// one thought by id
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
// adds reacion by id
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;