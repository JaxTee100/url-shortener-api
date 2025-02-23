require('dotenv').config();
const express = require('express');
const Router = require('./routes/url-routes');
const connectDB = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());



// Routes
app.use('/api', Router);

//connect to db
connectDB();


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
