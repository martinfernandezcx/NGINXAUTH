const express = require('express');
const app = express();

app.get('/api/public', (req, res) => {
    res.send("Public route: No auth needed");
});

app.get('/api/protected', (req, res) => {
    const userId = req.get("X-User-ID");
    res.send(`Protected route: Hello user ${userId}`);
});

app.listen(3000, () => console.log("Node API running on 3000"));
