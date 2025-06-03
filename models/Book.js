const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    category: {
        type: String,
    },
    publishedYear: {
        type: Number
    },
    coverImage: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model("Book",bookSchema);