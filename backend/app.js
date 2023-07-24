const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require("body-parser");
// const login = require("./routes/login");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/user_auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If everything is valid, return a success message
    return res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get the default connection
const db = mongoose.connection;

// Event handling for successful connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Event handling for connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// // Use the auth route
// app.use("/", login);

app.listen(3000, (req, res) => {
  console.log("App connected successfully on port 3000");
});
