import WebSocket from "ws";
import { Problem } from "./Problem";
import { Player } from "./Player";

export class Game {
    player1: Player;
    player2: Player;
    current_problem: Problem;
    time_remaining: number;
    intervalId: NodeJS.Timeout | null;

    constructor(player1_websocket: WebSocket, player2_websocket: WebSocket) {
        this.player1 = new Player(player1_websocket);
        this.player2 = new Player(player2_websocket);
        this.current_problem = new Problem;
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
        this.sendProblem()
        this.startTimer();
    }

    sendProblem(): void {
        this.player1.websocket.send(JSON.stringify({
            type: "CURRENT_PROBLEM",
            current_problem: this.current_problem
        }));
        
        this.player2.websocket.send(JSON.stringify({
            type: "CURRENT_PROBLEM",
            current_problem: this.current_problem
        }));
    }

    startTimer(): void {
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

    endGame(): void {
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
