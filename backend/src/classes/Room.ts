export {};

const _helper = require('../gameHelper');
const { PLAYER_STATUS } = _helper;

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

  findPlayerByName(playerName: string): Player | undefined {
    // console.log(this.players.keys());
    var iterator = this.players.keys();
    var i = this.players.size;
    while (i > 0) {
      var player = this.players.get(iterator.next().value);
      if (player?.name === playerName) return player;
      i--;
    }
    return undefined;
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

  allPlayersReady(): boolean {
    var iterator = this.players.keys();
    var i = this.players.size;
    while (i > 0) {
      var player = this.players.get(iterator.next().value);
      if (player?.status != PLAYER_STATUS.READY && player?.id != this.owner)
        return false;
      i--;
    }
    return true;
  }

  gameStarted(): void {
    var iterator = this.players.keys();
    var i = this.players.size;
    while (i > 0) {
      var player = this.players.get(iterator.next().value);
      if (player) player.status = PLAYER_STATUS.INGAME;
      i--;
    }
  }
}

module.exports = Room;
