import { randomTetrominoArray } from '../tetrominos';

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
    console.log(`connection "${socket.id}" connected`);
    socket.on('disconnect', () => {
      console.log(`"${socket.id}" disconnected`);
    });
  }
  on(): void {
    this._stage();
    this._getTetros();
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
