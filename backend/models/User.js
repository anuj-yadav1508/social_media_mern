const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:6,
        max:20,
        unique:true
    },
    email:{
        type:String,
        requierd:true,
        max:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    ProfilePicture:{
        type:String,
        default:''
    },
    coverPicture: {
        type:String,
        default:''
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    idAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    from:{
        type:String,
        default:''
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
        default:1
    }
},
    {timestamp:true}
)

module.exports = mongoose.model('User', UserSchema)