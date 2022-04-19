const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')

const router = express.Router()

// create a post 
router.post('/create',async (req, res) => {
   try {
       const newPost = new Post(req.body)
       await newPost.save()
        .then(res.status(200).json(newPost))
        .catch(err => res.status(500).json(err))
   } catch (err) {
       return res.status(500).json(err)
   } 
})


// update a post
router.put('/update/:id',async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({ $set: req.body })
                .then(res.status(200).json('your post has been updated'))
                .catch(err => res.status(500).json(err))
        }else{
            return res.status(403).json('You can update your post only')
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})


// delete a post 
router.delete('/delete/:id',async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.delete()
                .then(res.status(200).json('your post has been deleted'))
                .catch(err => res.status(500).json(err))
        }else{
            return res.status(403).json('You can delete your post only')
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

// like or dislike a post
router.put('/like/:id',async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: {likes: req.body.userId}})
            res.status(200).json('post has been liked')
        }else{
            await post.updateOne({ $pull: { likes: req.body.userId}})
            res.status(200).json('post has been disliked')
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})


// get all user's post 
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId : user._id})
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})
// get all timeline posts of a user
router.get('/timeline/:id',async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id)
        const userPosts = await Post.find({ userId: req.params.id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                 return Post.find({ userId: friendId })
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router;