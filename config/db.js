const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("mongodb connected");
    }catch(err) {
        console.log(`Error while connecting db Error: ${err}`)
        process.exit(1)
    }
}

module.exports = connectDB;