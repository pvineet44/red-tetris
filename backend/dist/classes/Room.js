"use strict";
class Room {
    constructor(roomName) {
        this.id = roomName;
        this.players = new Map();
        this.owner = null;
        this.winner = null;
        this.isStarted = false;
    }
}
module.exports = Room;
