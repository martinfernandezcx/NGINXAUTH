const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET = "my_secret";

app.get('/api/auth/login', (req, res) => {
    const token = jwt.sign({ sub: "123", role: "admin" }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(3000, () => console.log("Auth API running on 3000"));
