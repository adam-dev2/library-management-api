const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5001;
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require("./routes/authorRoutes")

connectDB();

app.use(express.json());
app.use('/api/books',bookRoutes);
app.use("/api/author",authorRoutes);

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})