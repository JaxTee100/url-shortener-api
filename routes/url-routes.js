const express = require('express');

const router = express.Router();

const { createShortUrl, getOriginalUrl, updateOriginalUrl, deleteShortUrl, redirectShortUrl, getStats } = require('../controller/url-controller');


// Create a short URL
router.post('/shorten', createShortUrl);

// Retrieve the original URL and redirect
router.get('/:shortUrl', getOriginalUrl);

// Get statistics
router.get('/stats/:shortUrl', getStats);

// Update the original URL
router.put('/update/:shortUrl', updateOriginalUrl);

// Delete a short URL
router.delete('/delete/:shortUrl', deleteShortUrl);

//redirect to original url
router.get('/redirect/:shortUrl', redirectShortUrl);


module.exports = router;