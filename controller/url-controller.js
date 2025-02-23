const Url = require('../model/Url');

//create short url
const createShortUrl = async (req, res) => {
    try {
        const { nanoid } = await import('nanoid');
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ error: 'Original URL is required' });
        }
    
        const shortUrl = nanoid(8);
        console.log("shortUrl", shortUrl);
        const newUrl = new Url({ originalUrl, shortUrl });
    
        await newUrl.save();
        res.json({ shortUrl });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error.message}` });
    }
   
};


//get original url
const getOriginalUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const urlEntry = await Url.findOne({ shortUrl });
    
        if (!urlEntry) {
            return res.status(404).json({ error: "URL not found" });
        }
    
        urlEntry.clicks += 1;
        await urlEntry.save();
        res.status(200).json({ originalUrl: urlEntry.originalUrl, shortUrl: urlEntry.shortUrl, clicks: urlEntry.clicks });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error.message}` });
        
    }
   
};

//get statistics
const getStats =async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const urlEntry = await Url.findOne({ shortUrl });
    
        if (!urlEntry) {
            return res.status(404).json({ error: "URL not found" });
        }
    
        res.json({ originalUrl: urlEntry.originalUrl, clicks: urlEntry.clicks });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error.message}` });
    }
   
};

//update original url
const updateOriginalUrl =async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const { newUrl } = req.body;

        const urlEntry = await Url.findOneAndUpdate(
            { shortUrl },
            { originalUrl: newUrl },
            { new: true }
        );

        if (!urlEntry) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.json({ message: "URL updated", updatedUrl: urlEntry });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error.message}` });
        
    }
    
};


//delete short url
const deleteShortUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const deletedUrl = await Url.findOneAndDelete({ shortUrl });

        if (!deletedUrl) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.status(200).json({ message: "URL deleted" });
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error.message}` });
        
    }
    
}

//redirect url
const redirectShortUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;

        const urlEntry = await Url.findOne({ shortUrl });

        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.redirect(urlEntry.originalUrl); // Redirects to the original URL
    } catch (error) {
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
};





module.exports = {
    createShortUrl, getOriginalUrl, getStats, updateOriginalUrl, deleteShortUrl, redirectShortUrl
};