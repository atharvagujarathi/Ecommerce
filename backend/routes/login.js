const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
// POST /login
router.post("/login", login.login);

module.exports = router;
