import { randomTetrominoArray } from '../tetrominos';
const { Rooms } = require('../Rooms');
const Room = require('./Room');
const Player = require('./Player');

class SocketManager {
  io: any;
  socket: any;
  id: string;
  roomName: string;

  constructor(io: any, socket: any) {
    this.io = io;
    this.socket = socket;
    this.id = socket.client.id;
    this.roomName = '';

    socket.on('disconnect', () => {
      console.log(`"${socket.id}" disconnected`);
    });
  }
  on(): void {
    this._createOrJoin();
    this._stage();
    this._getTetros();
  }

  emit(event: string, data: any): void {
    this.io.to(this.roomName).emit(event, data);
  }

  emitSelf(event: string, data: any): void {
    this.io.to(this.socket.id).emit(event, data);
  }

  _createOrJoin(): void {
    this.socket.on('createOrJoin', (data: any) => {
      const { roomName, userName } = data;
      if (Rooms.has(roomName)) {
        var room = Rooms.get(roomName);
        this.roomName = roomName;
        if (room.players.size >= 2) {
          console.log('LIMIT!');
          this.emitSelf('MaxLimit', 'Room is Full.');
          return;
        }
        var _newPlayer = new Player(this.id, userName);
        room.players.set(userName, _newPlayer);
        this.socket.join(roomName);
        let playerArray: object[] = [];
        for (let value of room.players.values()) {
          playerArray.push({
            playerName: value.name,
            isOwner: room.owner === value.id ? true : false,
          });
        }
        this.emit('Game', playerArray);
      } else {
        var _newRoom = new Room(roomName);
        var _newPlayer = new Player(this.id, userName);
        _newRoom.players.set(userName, _newPlayer);
        _newRoom.owner = _newPlayer.id;
        this.socket.join(roomName);
        Rooms.set(roomName, _newRoom);
        let playerArray: object[] = [];
        playerArray.push({
          playerName: _newPlayer.name,
          isOwner: true,
        });
        this.emitSelf('Game', playerArray);
      }
    });
  }

  _stage(): void {
    this.socket.on('stage', (stage: any) => {
      this.socket.broadcast.emit('OpponentStage', stage);
    });
  }

  _getTetros(): void {
    this.socket.on('getTetros', () => {
      console.log('GET TETROS  CALLED');
      this.socket.emit('tetroArray', randomTetrominoArray());
    });
  }
}

module.exports = SocketManager;
