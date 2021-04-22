const _helper = require('../gameHelper');
const { PLAYER_STATUS } = _helper;

class Player {
  id: string;
  name: string;
  status: number;
  score: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.status = PLAYER_STATUS.INIT;
    this.score = 0;
  }
}

module.exports = Player;
