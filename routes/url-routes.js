const express = require('express');

const router = express.Router();

const { createShortUrl, getOriginalUrl, updateOriginalUrl, deleteShortUrl } = require('../controller/url-controller');


// Create a short URL
router.post('/shorten', createShortUrl);

// Retrieve the original URL and redirect
router.get('/:shortUrl', getOriginalUrl);

// Get statistics
router.get('/stats/:shortUrl', );

// Update the original URL
router.put('/update/:shortUrl', updateOriginalUrl);

// Delete a short URL
router.delete('/delete/:shortUrl', deleteShortUrl);


module.exports = router;