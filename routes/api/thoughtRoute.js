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
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
// adds reacion by id
router.route(':thoughtsId/reactions').post(addReaction);
// deletes one reaction by id
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteThought);

module.exports = router;