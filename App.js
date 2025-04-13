// Import the express module
const express = require('express');

// Initialize the app
const app = express();

// Define the port (use Heroku's PORT environment variable or default to 3000)
const port = process.env.PORT || 3000;

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});