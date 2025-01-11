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
app.use(express.static(__dirname));
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Ensure Authorization is included
}));


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
            res.send("Signed up successfully to Delicious!");
        }
    }
    catch (err) {
        res.send("Error Signing up! Check your code");
    }
});

const secret_key = process.env.SECRET_KEY || "kj";

app.post('/loginresult', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userData.findOne({ email });

        if (!user) {
            return res.send("Email does not exist");
        }

        if (user.pass !== password) {
            return res.send("Error! Incorrect password");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, secret_key, { expiresIn: '1h' });
        res.json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.send("An error occurred while trying to log in");
    }
});


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Always lowercase
    const token = authHeader && authHeader.split(' ')[1]; // Ensure split after 'Bearer'

    if (!token) {
        console.log('Access Denied: No Token Provided');
        return res.status(401).send('Access Denied: No Token');
    }

    jwt.verify(token, secret_key, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ message: 'Token expired' });
            }
            return res.status(403).send('Invalid Token');
        }
        console.log('Verified User:', user);
        req.user = user;
        next();
    });
};



const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userData' },
    cartItems: [{
        img: String,
        dishname: String,
        description: String,
        quantity: Number,
        price: Number,
    }]
});

const CartItem = mongoose.model("CartItem", cartSchema);


app.post('/cart', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from the token
        const { img, dishname, description, quantity, price } = req.body;

        let userCart = await CartItem.findOne({ userId });

        if (!userCart) {
            userCart = new CartItem({
                userId,
                cartItems: [{ img, dishname, description, quantity, price }],
            });

            await userCart.save();
            return res.json({ message: "Cart created and item added", cart: userCart });
        }

        const existingItem = userCart.cartItems.find(item => item.dishname === dishname);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            userCart.cartItems.push({ img, dishname, description, quantity, price });
        }

        await userCart.save();
        res.json({ message: "Cart updated", cart: userCart });
    } catch (error) {
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


app.put('/cartitems/:dishname', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { dishname } = req.params;
    const { quantity } = req.body;

    try {
        const updateItem = await CartItem.updateOne({ userId, "cartItems.dishname": dishname }, { $set: { "cartItems.$.quantity": quantity } });
        if (!updateItem) {
            res.status(404).send({ message: "Not found", data: updateItem });
        }
        res.status(200).send({ message: "Item updated successfully", data: updateItem });
    }
    catch (error) {
        res.status(500).send({ message: "Error updating item:", data: updateItem });
    }
});


app.get('/cartitems', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const response = await CartItem.findOne({ userId });
        if (!response) {
            console.log("Error fetching items");
        }
        res.json(response.cartItems);
    }
    catch (error) {
        res.status(500).send({ message: "Error", error });
    }
});

app.delete('/cartitems/:dishname', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { dishname } = req.params;

    try {
        const Userexist = await CartItem.findOne({ userId });
        if (!Userexist) {
            console.log("User does not exist");
        }
        const deletedItem = await Userexist.cartItems.pull({ dishname });
        await Userexist.save();
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
        price: Number,
    })],
});

// Specify the 'itemdatas' collection explicitly
const Itemdata = mongoose.model('Itemdata', dataSchema);

// API Routes
app.get('/menuitem', async (req, res) => {
    try {
        const categories = await Itemdata.find();
        console.log(categories);
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Error fetching categories", error });
    }
});




const ReserveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userData' },
    Reservations: [{
        name: String,
        email: String,
        phone: Number,
        date: Date,
        time: String,
        NumberofGuests: Number,
        DiningType: String,
        SpecialRequest: String
    }]
});


const ReservationData = mongoose.model("ReservationData", ReserveSchema);

app.post('/reservation', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, phone, email, date, time, NumberofGuests, DiningType, SpecialRequest } = req.body;
        if (!name || !email || !phone || !time || !NumberofGuests || !date || !DiningType) {
            res.send({ message: "Validation error fields are missing values" });
        }
        const data = await ReservationData.findOne({ userId });
        if (!data) {
            const Userdata = new ReservationData({
                userId,
                Reservations: [{
                    name,
                    email,
                    phone,
                    date,
                    time,
                    NumberofGuests,
                    DiningType,
                    SpecialRequest,
                }]
            });
            const SaveData = await Userdata.save();
            res.send({ message: "Reservation made Successfully", SaveData });
        }
        else {
            data.Reservations.push({
                name,
                email,
                phone,
                date,
                time,
                NumberofGuests,
                DiningType,
                SpecialRequest,
            });

            const updatedData = await data.save();
            res.status(200).send({ message: "Reservation made successfully! Here's the Data we received: ", updatedData });
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error submitting the form:", err });
    }
})


app.listen(port, (req, res) => {
    console.log(`Server running on ${port}`);
});