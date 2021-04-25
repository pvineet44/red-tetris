"use strict";
const _helper = require('../gameHelper');
const { PLAYER_STATUS } = _helper;
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.status = PLAYER_STATUS.INIT;
        this.score = 0;
    }
    updatePlayerStatus(status) {
        this.status = status;
    }
}
module.exports = Player;
