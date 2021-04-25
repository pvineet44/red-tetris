"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tetrominos_1 = require("../tetrominos");
const { Rooms } = require('../Rooms');
const Room = require('./Room');
const Player = require('./Player');
const _helper = require('../gameHelper');
const { PLAYER_STATUS } = _helper;
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
        this._onDisconnecting();
        this._onPenalty();
        this._onReady();
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
                if (room.players.size >= 3) {
                    console.log('LIMIT!');
                    this.emitSelf('MaxLimit', 'Room is Full.');
                    return;
                }
                if (room.players.get(userName)) {
                    // get player by userName need to make this.
                    console.log('DUPLICATE USERNAME!');
                    this.emitSelf('UserNameTaken', 'Username is already taken');
                    return;
                }
                var _newPlayer = new Player(this.id, userName);
                room.addPlayer(_newPlayer);
                //room.players.set(userName, _newPlayer);
                this.socket.join(roomName);
                let playerArray = [];
                for (let value of room.players.values()) {
                    playerArray.push({
                        playerName: value.name,
                        isOwner: room.owner === value.id ? true : false,
                    });
                }
                this.emitSelf('Valid', 'Starting game'); //welcome component
                this.emit('Game', playerArray); // tetris component
            }
            else {
                var _newRoom = new Room(roomName);
                var _newPlayer = new Player(this.id, userName);
                _newRoom.addPlayer(_newPlayer);
                // _newRoom.players.set(userName, _newPlayer);
                _newRoom.owner = _newPlayer.id;
                this.socket.join(roomName);
                this.roomName = roomName;
                Rooms.set(roomName, _newRoom);
                let playerArray = [];
                playerArray.push({
                    playerName: _newPlayer.name,
                    isOwner: true,
                });
                this.emitSelf('Valid', 'Starting game'); // welcome component
                this.emitSelf('Game', playerArray); // tetris component
                this.emit('Game', playerArray); // tetris component
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
    _onDisconnecting() {
        this.socket.on('disconnecting', () => {
            this._quit();
        });
    }
    _quit() {
        console.log('Room Name: ', Rooms.get(this.roomName));
        console.log(`"${this.socket.id}" disconnected`);
        var room = Rooms.get(this.roomName);
        if (!room)
            return;
        room.removePlayerById(this.id);
        this.socket.leave(this.roomName);
        if (room.players.size === 0) {
            Rooms.delete(room);
            return;
        }
        // if (room.isStarted && room.players.size === 1) {
        // } else if (room.isStarted && room.players.size > 1) {
        // }
        if (!room.isStarted && room.owner === this.id) {
            room.owner = room.players.keys().next().value;
            let playerArray = [];
            for (let value of room.players.values()) {
                playerArray.push({
                    playerName: value.name,
                    isOwner: room.owner === value.id ? true : false,
                });
            }
            this.emit('Game', playerArray); //tetris component
        }
    }
    _onPenalty() {
        this.socket.on('penalty', (rows) => {
            console.log('rows cleared: ', rows);
            // if (Rooms.get(this.roomName).players.size > 1)
            //   this.socket.emit('addPenalty', rows);
        });
    }
    _onReady() {
        this.socket.on('ready', (playerName) => {
            // console.log('ready: ', playerName);
            var room = Rooms.get(this.roomName);
            if (!room)
                return;
            let _player = room.findPlayerByName(playerName);
            _player.updatePlayerStatus(PLAYER_STATUS.READY);
            // if (room.allPlayersReady()) console.log('Yo!');
            this.emit('OpponentReady', playerName);
        });
    }
}
module.exports = SocketManager;
