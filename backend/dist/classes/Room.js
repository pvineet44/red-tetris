"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _helper = require('../gameHelper');
const { PLAYER_STATUS } = _helper;
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
    findPlayerByName(playerName) {
        // console.log(this.players.keys());
        var iterator = this.players.keys();
        var i = this.players.size;
        console.log('size:', i);
        while (i > 0) {
            var player = this.players.get(iterator.next().value);
            console.log('cmp: ', player === null || player === void 0 ? void 0 : player.name, playerName);
            if ((player === null || player === void 0 ? void 0 : player.name) === playerName)
                return player;
            i--;
        }
        return undefined;
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
    allPlayersReady() {
        var iterator = this.players.keys();
        var i = this.players.size;
        while (i > 0) {
            var player = this.players.get(iterator.next().value);
            if ((player === null || player === void 0 ? void 0 : player.status) != PLAYER_STATUS.READY && (player === null || player === void 0 ? void 0 : player.id) != this.owner)
                return false;
            i--;
        }
        return true;
    }
    gameStarted() {
        var iterator = this.players.keys();
        var i = this.players.size;
        while (i > 0) {
            var player = this.players.get(iterator.next().value);
            if (player)
                player.status = PLAYER_STATUS.INGAME;
            i--;
        }
    }
    isGameOver() {
        var iterator = this.players.keys();
        var i = this.players.size;
        var count = 0;
        while (i > 0) {
            var player = this.players.get(iterator.next().value);
            if (player && player.status === PLAYER_STATUS.GAMEOVER) {
                count++;
            }
            i--;
        }
        if (this.players.size - count === 1)
            return true;
        else
            return false;
    }
    getWinnerName() {
        var iterator = this.players.keys();
        var i = this.players.size;
        while (i > 0) {
            var player = this.players.get(iterator.next().value);
            if (player && player.status !== PLAYER_STATUS.GAMEOVER)
                return player.name;
        }
        return undefined;
    }
}
module.exports = Room;
