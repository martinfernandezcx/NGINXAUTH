const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET = "my_secret";

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Login endpoint
app.get('/login', (req, res) => {
    const token = jwt.sign({ sub: "123", role: "admin" }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(3001, () => console.log("Auth API running on 3001"));
