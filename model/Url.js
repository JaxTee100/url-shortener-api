const mongoose = require("mongoose");


// Define URL Schema
const UrlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: { type: Number, default: 0 }
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;