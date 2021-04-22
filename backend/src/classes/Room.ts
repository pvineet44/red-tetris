class Room {
  id: string;
  players: Map<string, Player>;
  owner: null | string;
  winner: null | string;
  isStarted: boolean;

  constructor(roomName: string) {
    this.id = roomName;
    this.players = new Map<string, Player>();
    this.owner = null;
    this.winner = null;
    this.isStarted = false;
  }
}

module.exports = Room;
