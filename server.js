const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5001;
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require("./routes/authorRoutes")
const userRoutes = require('./routes/userRoutes')
const loanRoutes = require('./routes/loanRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

connectDB();

app.use(express.json());
app.get('/',(req,res) => {
    res.status(200).json({message:"This is the API for the Library management system. For furhter endpoints you can visit github repo, repo link: (https://github.com/adam-dev2/library-management-api)"})
})
app.use('/api/books',bookRoutes);
app.use("/api/authors",authorRoutes);
app.use('/api/users',userRoutes)
app.use('/api/loans', loanRoutes);
app.use('/api/books', reviewRoutes); 

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})