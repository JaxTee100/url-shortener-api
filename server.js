require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes/url-routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());



// Routes
app.use('/api', Router);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
