const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to check admin role
const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// Get all pending users
router.get("/pending-users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Unable to fetch pending users." });
  }
});

// Approve a user
router.put("/approve/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Unable to approve user." });
  }
});

// Reject a user
router.put("/reject/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Unable to reject user." });
  }
});

module.exports = router;