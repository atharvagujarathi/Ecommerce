const express = require("express");
const mongoose = require("mongoose");
const app = express();
const login = require("./routes/login");
const { Schema } = mongoose;

const cors = require("cors");
app.use(express.urlencoded({ extended: false }));

// Define the Admin schema
const adminSchema = new Schema({
  username: String,
  email: String,
  // Add other admin fields as needed
});

// Define the Password schema
const passwordSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
  password: String,
  // Add other password fields as needed
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

// Create the Password model
const Password = mongoose.model("Password", passwordSchema);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ecw", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Use the auth route
app.use("/", login);

app.listen(3000, (req, res) => {
  console.log("App connected successfully on port 3000");
});

// Export the models
module.exports = {
  Admin,
  Password,
};
