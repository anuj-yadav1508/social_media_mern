const express = require('express')
const router = express.Router()

const Message = require('../models/Message')

// Creating a new message
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// Getting the message of a conversation
router.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({ conversationId : req.params.conversationId}) 
        res.status(200).json(messages)
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router;