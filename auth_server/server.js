require('dotenv').config();
const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    // auth user here
    if (req.body.pass !== 'smecheru') return res.sendStatus(403);

    const userObj = { user: req.body.user };
    const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
});

app.listen(4002, () => {
    console.log('Auth server running on 4002');
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user.user;
        next();
    });
}