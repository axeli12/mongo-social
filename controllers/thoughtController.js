const { json } = require('express');
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

async getOneThought(req, res) {
    try {
        const thought = await thoughts.findOne({ _id: req.params.thoughtid })
        .select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'There is no though with tha Id'})
        }
        res,json({ thought })
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
    }
}
}