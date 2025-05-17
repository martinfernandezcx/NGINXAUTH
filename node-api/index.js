const express = require('express');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Public endpoint
app.get('/', (req, res) => {
    res.json({ message: "Public route: No auth needed" });
});

// Protected endpoint
app.get('/user', (req, res) => {
    const userId = req.get("X-User-ID");
    res.json({ 
        message: "Protected route: Hello user",
        userId: userId 
    });
});

app.listen(3000, () => console.log("Node API running on 3000"));
