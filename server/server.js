const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

/*
    Storage Structure

    {
        abc123: {
            longUrl: "...",
            clicks: 0,
            createdAt: ...
        }
    }
*/
const urlDatabase = {};


function generateShortCode(length = 6) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let code = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(
            Math.random() * chars.length
        );

        code += chars[randomIndex];
    }

    return code;
}


function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}


app.post("/api/shorten", (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            message: "URL is required"
        });
    }

    if (!isValidUrl(url)) {
        return res.status(400).json({
            message: "Invalid URL"
        });
    }

    let shortCode;

    do {
        shortCode = generateShortCode();
    } while (urlDatabase[shortCode]);

    urlDatabase[shortCode] = {
        longUrl: url,
        clicks: 0,
        createdAt: Date.now()
    };

    res.status(201).json({
        shortCode,
        shortUrl: `http://localhost:${PORT}/${shortCode}`
    });
});



app.get("/:shortCode", (req, res) => {

    const { shortCode } = req.params;

    const urlData = urlDatabase[shortCode];

    if (!urlData) {
        return res.status(404).send("Short URL not found");
    }

    urlData.clicks++;

    res.redirect(urlData.longUrl);
});



app.get("/api/stats/:shortCode", (req, res) => {

    const { shortCode } = req.params;

    const urlData = urlDatabase[shortCode];

    if (!urlData) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    res.json({
        shortCode,
        longUrl: urlData.longUrl,
        clicks: urlData.clicks,
        createdAt: urlData.createdAt
    });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});