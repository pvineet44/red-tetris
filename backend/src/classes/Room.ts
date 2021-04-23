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

  findPlayerById(playerId: string): Player | undefined {
    return this.players.get(playerId);
  }

  removePlayerById(playerId: string): boolean {
    return this.players.delete(playerId);
  }

  addPlayer(player: Player): void {
    this.players.set(player.id, player);
  }

  setPlayerStatus(playerId: string, status: number): void {
    let _player = this.players.get(playerId);
    if (!_player) return;
    _player.status = status;
  }
}

module.exports = Room;
