"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tetrominos_1 = require("../tetrominos");
const { Rooms } = require('../Rooms');
const Room = require('./Room');
const Player = require('./Player');
class SocketManager {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.id = socket.client.id;
        this.roomName = '';
        socket.on('disconnect', () => {
            console.log(`"${socket.id}" disconnected`);
        });
    }
    on() {
        this._createOrJoin();
        this._stage();
        this._getTetros();
    }
    emit(event, data) {
        this.io.to(this.roomName).emit(event, data);
    }
    emitSelf(event, data) {
        this.io.to(this.socket.id).emit(event, data);
    }
    _createOrJoin() {
        this.socket.on('createOrJoin', (data) => {
            const { roomName, userName } = data;
            if (Rooms.has(roomName)) {
                var room = Rooms.get(roomName);
                this.roomName = roomName;
                if (room.players.size >= 2) {
                    console.log('LIMIT!');
                    this.emitSelf('MaxLimit', 'Room is Full.');
                    return;
                }
                if (room.players.get(userName)) {
                    this.emitSelf('UserNameTaken', 'Username is already taken');
                    return;
                }
                var _newPlayer = new Player(this.id, userName);
                room.players.set(userName, _newPlayer);
                this.socket.join(roomName);
                let playerArray = [];
                for (let value of room.players.values()) {
                    playerArray.push({
                        playerName: value.name,
                        isOwner: room.owner === value.id ? true : false,
                    });
                }
                this.emit('Game', playerArray);
            }
            else {
                var _newRoom = new Room(roomName);
                var _newPlayer = new Player(this.id, userName);
                _newRoom.players.set(userName, _newPlayer);
                _newRoom.owner = _newPlayer.id;
                this.socket.join(roomName);
                Rooms.set(roomName, _newRoom);
                let playerArray = [];
                playerArray.push({
                    playerName: _newPlayer.name,
                    isOwner: true,
                });
                this.emitSelf('Game', playerArray);
            }
        });
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
