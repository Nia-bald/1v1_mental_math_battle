"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Problem_1 = require("./Problem");
const Player_1 = require("./Player");
class Game {
    constructor(player1_websocket, player2_websocket) {
        this.player1 = new Player_1.Player(player1_websocket);
        this.player2 = new Player_1.Player(player2_websocket);
        this.current_problem = new Problem_1.Problem;
        this.time_remaining = 10;
        this.intervalId = null;
        // Notify players that the game has started
        this.player1.websocket.send(JSON.stringify({
            type: "INIT_GAME",
            text: "GAME_STARTED"
        }));
        this.player2.websocket.send(JSON.stringify({
            type: "INIT_GAME",
            text: "GAME_STARTED"
        }));
        // Start the timer
        this.sendProblem();
        this.startTimer();
    }
    sendProblem() {
        this.player1.websocket.send(JSON.stringify({
            type: "CURRENT_PROBLEM",
            current_problem: this.current_problem
        }));
        this.player2.websocket.send(JSON.stringify({
            type: "CURRENT_PROBLEM",
            current_problem: this.current_problem
        }));
    }
    startTimer() {
        this.intervalId = setInterval(() => {
            this.time_remaining--;
            // Send updated time to both players
            this.player1.websocket.send(JSON.stringify({
                type: "TIME_UPDATE",
                time_remaining: this.time_remaining
            }));
            this.player2.websocket.send(JSON.stringify({
                type: "TIME_UPDATE",
                time_remaining: this.time_remaining
            }));
            // If time runs out, stop the game
            if (this.time_remaining <= 0) {
                this.endGame();
            }
        }, 1000); // Decrease time every second (1000 ms)
    }
    endGame() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Stop the timer
        }
        this.player1.websocket.send(JSON.stringify({
            type: "GAME_OVER",
            text: "Time's up!"
        }));
        this.player2.websocket.send(JSON.stringify({
            type: "GAME_OVER",
            text: "Time's up!"
        }));
    }
}
exports.Game = Game;
