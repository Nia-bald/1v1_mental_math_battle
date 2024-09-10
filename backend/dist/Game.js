"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1.send(JSON.stringify({ type: "INIT_GAME",
            text: "GAME_STARTED"
        }));
        this.player2.send(JSON.stringify({ type: "INIT_GAME",
            text: "GAME_STARTED"
        }));
    }
}
exports.Game = Game;
