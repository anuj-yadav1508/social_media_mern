const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default:''
    },
    image:{
        type: String,
        default: ""
    },
    likes: {
        type: Array,
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", PostSchema)