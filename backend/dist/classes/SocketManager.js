"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tetrominos_1 = require("../tetrominos");
class SocketManager {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.id = socket.client.id;
        this.roomName = '';
        console.log(`connection "${socket.id}" connected`);
        socket.on('disconnect', () => {
            console.log(`"${socket.id}" disconnected`);
        });
    }
    on() {
        this._stage();
        this._getTetros();
    }
    _stage() {
        this.socket.on('stage', (stage) => {
            this.socket.broadcast.emit('OpponentStage', stage);
        });
    }
    _getTetros() {
        this.socket.on('getTetros', () => {
            console.log('GET TETROS  CALLED');
            this.socket.emit('tetroArray', tetrominos_1.randomTetrominoArray());
        });
    }
}
module.exports = SocketManager;
