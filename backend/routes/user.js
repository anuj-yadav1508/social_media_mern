const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const router = express.Router()
// update a user
router.put('/update/:id',async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        // if user wants to update its password we need to hash it 
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err)
            }
        }

        // updating other parts of the user provided
        try {
         const user = await User.findByIdAndUpdate(req.params.id, {
             $set:req.body
         })

         res.status(200).json('user has been updated successfully')
    } catch (err) {
            res.status(500).json(err)
    }
    }else{
       return  res.status(403).json('You cannot update somebody else account')
    }
})

// delete a user
router.delete('/delete/:id',async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user has been deleted successfully')
        } catch (err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json('you can delete your account only')
    }
})

// get a user
router.get('/',async (req, res) => {
    const username = req.query.username
    const userId = req.query.userId
    try {
        const user = userId ? await User.findOne({ _id: userId }) : await User.findOne({ username: username })
        
        const {password, updatedAt, ...other} = user._doc

        res.status(200).json(other)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// getting friends
router.get('/friends/:userId',async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
        user.followings.map(friendId => {
            return User.findById(friendId)
        })
    )
        let friendList = []
    friends.map(friend => {
        const {_id,username,ProfilePicture} = friend
        friendList.push({_id, username, ProfilePicture})
    })

    res.status(200).json(friendList)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// follow a user
router.put('/follow/:id',async (req, res) => {
    if(req.body.userId === req.params.id){
        return res.status(403).json('You cannot follow yourself')
    }else{
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}})
                await currentUser.updateOne({ $push: {followings: req.params.id}})
                res.status(200).json('user has been followed')
            }else{
                return res.status(403).json('You follow this account already')
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    }
})

// unfollow a user
router.put('/unfollow/:id',async (req, res) => {
    if(req.body.userId === req.params.id){
        return res.status(403).json('You cannot follow yourself')
    }else{
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}})
                await currentUser.updateOne({ $pull: {followings: req.params.id}})
                res.status(200).json('user has been unfollowed')
            }else{
                return res.status(403).json('You does not follow this account')
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    }
})

module.exports = router;