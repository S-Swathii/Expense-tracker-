// app.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel"); // Import the User model

const app = express();

// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://127.0.0.1:27017/expenses"; // for local connection

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware to parse JSON
app.use(express.json());

// Example: Endpoint to create a new user
app.post("/users", async (req, res) => {
  const { name, username, gmail, password } = req.body;
  
  try {
    const newUser = new User({
      name,
      username,
      gmail,
      password,
      userFirstSignUp: new Date().toISOString(),
      userData: [],
      expenses: [],
      category: [],
    });

    const result = await newUser.save();
    res.status(201).json({ message: "User created", user: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Example: Endpoint to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = app;
