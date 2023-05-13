const { user, thoughts } = require('../models');

module.exports = {

async getAllUsers(req, res) {
    try {
        const users = await user.find();
        const userObj = { users }
        res.json(userObj);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
},

async getUserById(req, res) {
    try {
      const users = await user.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!users) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
        const users = await user.findOneRemove({ _id: req.params.userId })

        if (!users) {
            return res.status(404).json({ message: 'No user found' })
        }
        await thoughts.deleteMany({ username: users.username })
        res.json({ message: 'User and their thoughts have been deleted '})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  },

  async createUser(req, res) {
    try {
        const users = user.create(req.body)
        res.json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  },

  async addFriend(req, res) {
    try {
        const users = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendsId } },
            { runValidators: true, new: true }
        )
        if (!users) {
            return res.status(404).json({ message: 'No user found' })
        }
        res.json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  },

//   async deleteFriend(req, res) {
//     try {
//         const users = await user.findOneAndUpdate(
//             { _id: req.params.userId },
//             { $pull: { friends: req.params.friendsId }},
//             { runValidators: true, new: true }

//         )

//         if (!users) {
//             return res.status(404).json({ message: 'No user found'})
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//       }
//   },

  async updateUser(req, res) {
    try {
        const users = await user.findOneAndUpdate( 
            { _id: req.params.userId },
            { $set: req.body }
        )
        if (!users) {
            return res.status(404).json({ message: 'There is no user'})
        }
        res.json({ message: 'User has been updated'})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  },

}