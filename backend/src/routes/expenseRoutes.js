const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

// Add an expense
router.post("/", authMiddleware, async (req, res) => {
  const { amount, quantity, item_name } = req.body;

  try {
    const expense = new Expense({
      user_id: req.user.id,
      amount,
      quantity,
      item_name,
    });
    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: "Unable to add expense." });
  }
});

// Get expenses for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: "Unable to fetch expenses." });
  }
});

module.exports = router;