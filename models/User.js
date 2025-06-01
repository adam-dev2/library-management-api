const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    profilePicture:{
        type:String,
        default: ""
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);