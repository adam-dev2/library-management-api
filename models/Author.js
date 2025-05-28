const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    bio: {
        type:String,
    },
    nationality: {
        type: String,
    },
    birthyear: {
        type: Number
    }
},{timestamps:true})

module.exports = mongoose.model("Author",authorSchema);