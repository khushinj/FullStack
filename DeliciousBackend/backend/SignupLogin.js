const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
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
        const { email, pass } = req.body;
        const user = await userData.findOne({ email }); // Correct query format

        if (!user) {
            return res.send("Email does not exist");
        }

        if (user.pass !== pass) {
            return res.send("Error! Incorrect password");
        }

        res.send("Logged in successfully");
    } catch (error) {
        console.error("Error during login:", error);
        res.send("An error occurred while trying to log in");
    }
});


app.listen(port, (req, res) => {
    console.log(`Server running on ${port}`);
});