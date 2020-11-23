require('dotenv').config();
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
var http = require('http');
var socketio = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);
const io = socketio(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});

const info = { iam: 'info' };

app.get('/info', authenticateToken, (req, res) => {
    res.json({ info, user: req.user });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    let id = 0;
    console.log('a user connected');
    const interval = setInterval(() => {
        const value = Math.ceil(Math.random() * 5000);
        const ok = Math.random() > 0.15 ? true : false;
        id += 1;
        socket.emit('new data', {
            id: id,
            product: 'wood',
            value,
            ok,
            time: new Date(),
        });
    }, 2000);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        clearTimeout(interval);
    });
});

// app.listen(4001, () => {
//     console.log('Socket server running on 4001');
// });

httpServer.listen(4001, () => {
    console.log('Socket server listening on port 4001');
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user.user;
        next();
    });
}
