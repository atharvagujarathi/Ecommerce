// Example login controller logic
const login = (req, res) => {
  const { username, password } = req.body;
  // Validate the username and password
  // Implement your authentication logic here
  // Example: Check if the username and password are valid
  if (username === "admin" && password === "password") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = {
  login,
};
