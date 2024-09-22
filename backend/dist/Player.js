"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(websocket) {
        this.websocket = websocket;
        this.score = 0;
    }
    increment_score() {
        this.score++;
    }
}
exports.Player = Player;
