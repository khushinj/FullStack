const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/delicious', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database successfully!");
}).catch((err) => {
    console.error("Error connecting to database", err);
});

// Define the Schema for the nested structure




// Server Start
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
