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

io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // socket.disconnect(true);
                return res.sendStatus(403);
                // next(new Error('Authentication error'));
            } 
            socket.decoded = decoded;
            next();
        });


    } else {
        next(new Error('Authentication error'));
    }
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

const info = { iam: 'info' };

app.get('/info', authenticateToken, (req, res) => {
    res.json({ info, user: req.user });
});

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
