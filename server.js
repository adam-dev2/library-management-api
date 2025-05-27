const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})