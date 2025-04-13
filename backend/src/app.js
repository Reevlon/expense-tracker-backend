const adminRoutes = require("./routes/adminRoutes");

// Add this line after other routes
app.use("/api/admin", adminRoutes);