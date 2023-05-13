const { thoughts, user } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await thoughts.find();
            const thoughtObj = {
                thought
            };
            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        };
    },

async getThoughtById(req, res) {
    try {
        const thought = await thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'There is no thought with tha Id'})
        }
        res.json({ thought })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        };
    },

async createThought(req, res) {
    try {
        const thought = await thoughts.create(req.body);
        res.json(thought)
        const users = await user.findOneAndUpdate(
            { _id: req.body.usersId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        if (!users) {
            return res.status(404).json({
                message: 'Thought created no user found '
            });
        }
    } catch (err) {
        res.status(500).json(err)
    }
},
async updateThought(req, res) {
    try {
        const thought = await thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
        );
        if (!thought) {
            return res.status(404).json({ message: 'Theres is no thought' })
        }
        res.json({ message: 'Thought has been Updated!' })
    } catch (err) {
        res.status(500).json(err)
    }
},
async deleteThought(req, res) {
    try {
        const thought = await thoughts.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
        if(!thought) {
            return res.status(404).json({ message: 'There is no thought' })
        }
        res.json({ message: 'Thought has been deleted!'})
    } catch (err) {
        res.status(500).json(err)
    }
} ,
async addReaction(req, res) {
    try {
        const thought = await thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet : { reactions: req.body } }
        )
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that id found'})
        }
        res.json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
}
}