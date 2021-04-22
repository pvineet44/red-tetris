import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import { randomTetrominoArray } from './tetrominos';

const SocketManager = require('./classes/SocketManager');

const app: Express = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
// app.use(routes)
// if(process.env.NODE_ENV=="production"){
app.use(express.static('../../public/'));
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});
// }

// console.log(`Server running on http://localhost:${PORT}`)

const uri = 'mongodb+srv://admin:admin@cluster0.s5t7m.mongodb.net/red-tetris';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`, __dirname);
  io.on('connection', (socket: any) => {
    const socketManager = new SocketManager(io, socket);
    socketManager.on();
  });
});
