const Url = require('../model/Url');
const shortid = require('nanoid');

//create short url
const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    const shortUrl = shortid.generate();
    console.log("shortUrl", shortUrl);
    const newUrl = new Url({ originalUrl, shortUrl });

    await newUrl.save();
    res.json({ shortUrl });
};


//get original url
const getOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const urlEntry = await Url.findOne({ shortUrl });

    if (!urlEntry) {
        return res.status(404).json({ error: "URL not found" });
    }

    urlEntry.clicks += 1;
    await urlEntry.save();
    res.redirect(urlEntry.originalUrl);
};

//get statistics
const getStats =async (req, res) => {
    const { shortUrl } = req.params;
    const urlEntry = await Url.findOne({ shortUrl });

    if (!urlEntry) {
        return res.status(404).json({ error: "URL not found" });
    }

    res.json({ originalUrl: urlEntry.originalUrl, clicks: urlEntry.clicks });
};

//update original url
const updateOriginalUrl =async (req, res) => {
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
};


//delete short url
const deleteShortUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const deletedUrl = await Url.findOneAndDelete({ shortUrl });

    if (!deletedUrl) {
        return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({ message: "URL deleted" });
}
module.exports = {
    createShortUrl, getOriginalUrl, getStats, updateOriginalUrl, deleteShortUrl
};