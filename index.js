console.log('Starting the server...'); // Log to ensure script execution begins

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
console.log('Middleware configured.');

// Route setup
app.use('/api/todos', todoRoutes);
console.log('Routes initialized.');

// Database connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global error handler (optional for debugging)
process.on('uncaughtException', (err) => {
  console.error('Unhandled exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});

console.log('Script executed without errors (end of file reached).');

