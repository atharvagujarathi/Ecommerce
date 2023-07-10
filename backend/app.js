const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://127.0.0.1:27017/ecw", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Login = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Blog = mongoose.model("Login", Login);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(cors());

app.listen(3000, (req, res) => {
  console.log("App connected successfully on port 3000");
});
