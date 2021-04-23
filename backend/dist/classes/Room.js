"use strict";
class Room {
    constructor(roomName) {
        this.id = roomName;
        this.players = new Map();
        this.owner = null;
        this.winner = null;
        this.isStarted = false;
    }
    findPlayerById(playerId) {
        return this.players.get(playerId);
    }
    removePlayerById(playerId) {
        return this.players.delete(playerId);
    }
    addPlayer(player) {
        this.players.set(player.id, player);
    }
    setPlayerStatus(playerId, status) {
        let _player = this.players.get(playerId);
        if (!_player)
            return;
        _player.status = status;
    }
}
module.exports = Room;
