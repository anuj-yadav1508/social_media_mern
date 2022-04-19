const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const router = express.Router()

// login user
router.post('/login',async (req, res) => {
    try {
        const user = await User.findOne({ email:req.body.email })
        if(user){
            // comparing passwords
            const matched = await bcrypt.compare(req.body.password, user.password)
                
        if(matched){
            res.status(200).json(user)
        }else{
            res.status(403).json('Your passwords does not matched')
        }
        }else{
            res.status(403).json('User not found')
        }  
    } catch (err) {
        console.log(err)
    }
})


// register user
router.post('/register',async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            res.status(403).send('This email is already registered')
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password:hashedPassword
            })

            await newUser.save()
                .then(res.status(200).json(newUser))
                .catch(err => res.status(500).json(err))
        }
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;