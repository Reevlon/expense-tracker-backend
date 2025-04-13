const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered. Awaiting approval." });
  } catch (error) {
    res.status(400).json({ error: "User registration failed." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found." });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials." });

  if (user.status !== "approved") {
    return res.status(403).json({ error: "Account not approved yet." });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
  res.status(200).json({ token });
});

module.exports = router;