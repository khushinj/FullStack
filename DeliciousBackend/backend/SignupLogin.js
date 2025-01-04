const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the current directory
app.use(cors());


mongoose.connect('mongodb://localhost:27017/delicious').then(() => {
    console.log("Connected to database successfully!");
}).catch((error) => {
    console.log("Error connecting to database :", error);
});



const userSchema = new mongoose.Schema({
    uname: String,
    email: String,
    pass: String,
});


const userData = mongoose.model('userData', userSchema);



app.get('/userdata', async (req, res) => {
    try {
        const data = await userData.find();
        console.log(data);
        res.json(data);
    }
    catch (error) {
        console.error(error);
    }
})



app.post('/signupresult', async (req, res) => {
    try {
        const { uname, email, pass } = req.body;
        console.log(req.body);
        const finddata = await userData.findOne({ email });
        if (finddata) {
            res.send(`Email already exists!`);
        }
        else {
            const newData = new userData({ uname, email, pass });
            await newData.save();
            console.log("newdata", newData);
            res.send("Signed up successfully to Delicious! Check your database for further confirmation");
        }


    }
    catch (err) {
        res.send("Error Signing up! Check your code");
    }
});


app.post('/loginresult', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userData.findOne({ email }); // Correct query format

        if (!user) {
            return res.send("Email does not exist");
        }

        if (user.pass !== password) {
            return res.send("Error! Incorrect password");
        }

        res.send("Logged in successfully");
    } catch (error) {
        console.error("Error during login:", error);
        res.send("An error occurred while trying to log in");
    }
});


const cartSchema = new mongoose.Schema({
    img: String,
    dishname: String,
    description: String,
    quantity: Number
});

const CartItem = mongoose.model("CartItem", cartSchema);

app.post('/cart', async (req, res) => {
    try {
        const { img, dishname, description, quantity } = req.body;
        const Itemexist = await CartItem.findOne({ dishname });
        if (!Itemexist) {
            const newItem = new CartItem({ img, dishname, description, quantity });
            const savedItem = await newItem.save();
            return res.status(200).json({ message: "Data saved", item: savedItem });
        }
        Itemexist.quantity += quantity;
        const updatedItem = await Itemexist.save();
        res.status(200).send({ message: "Quantity updated", item: updatedItem });

    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error saving item", error });
    }
});


const ContactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    message: String,
});


const ContactusData = new mongoose.model("ContactusData", ContactSchema);

app.post('/contactus', async (req, res) => {
    const { fname, lname, email, phone, message } = req.body;
    try {
        const newData = new ContactusData({ fname, lname, email, phone, message });
        const savedData = await newData.save();
        console.log("Data sent", savedData);
        res.status(200).send({ message: "Our team will contact u soon", data: savedData });
    }
    catch (error) {
        res.status(500).send({ message: "Error updating the data", error });
    }
});


const FeedbackSchema = new mongoose.Schema({
    label: String,
    feedback: String,
});

const FeedbackData = new mongoose.model("FeedbackData", FeedbackSchema);

app.post('/feedback', async (req, res) => {
    const { feedback, label } = req.body;
    try {
        const newData = new FeedbackData({ label, feedback });
        const saveData = newData.save();
        res.status(200).send({ message: "Feedback Subitted successfully", data: saveData });
    }
    catch (error) {
        res.status(500).send({ message: "Error submitting feedback ! Please try again later." });
    }
});


app.put('/cartitems/:dishname', async (req, res) => {
    const { dishname } = req.params;
    const { quantity } = req.body;

    try {
        const updateItem = await CartItem.findOneAndUpdate({ dishname }, { quantity });
        if (!updateItem) {
            res.status(404).send({ message: "Not found", data: updateItem });
        }
        res.status(200).send({ message: "Item updated successfully", data: updateItem });
    }
    catch (error) {
        res.status(500).send({ message: "Error updating item:", data: updateItem });
    }
});


app.get('/cartitems', async (req, res) => {
    try {
        const response = await CartItem.find();
        res.json(response);
    }
    catch (error) {
        res.send("Error:", error);
    }
});

app.delete('/cartitems/:dishname', async (req, res) => {
    const { dishname } = req.params;

    try {
        const deletedItem = await CartItem.findOneAndDelete({ dishname });
        if (!deletedItem) {
            res.send("Item not deleted");
        }
        console.log("Item deleted successfully");
        res.send("Item deleted successfully");
    }
    catch (error) {
        res.send("Error deleting the item");
    }
});


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
app.get('/menuitem', async (req, res) => {
    try {
        const categories = await Itemdata.find();
        console.log(categories);   // Fetch all entries
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Error fetching categories", error });
    }
});


app.listen(port, (req, res) => {
    console.log(`Server running on ${port}`);
});