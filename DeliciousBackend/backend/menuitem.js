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

const dataSchema = new mongoose.Schema({
    title: String,
    items: [new mongoose.Schema({
        dishname: String,
        link: String,
        description: String,
    })], // Array of items
});

// Specify the 'itemdatas' collection explicitly
const Itemdata = mongoose.model('Itemdata', dataSchema);

// API Routes
app.get('/', async (req, res) => {
    try {
        const categories = await Itemdata.find();
        console.log(categories);   // Fetch all entries
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Error fetching categories", error });
    }
});


// Server Start
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
