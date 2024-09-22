import WebSocket from "ws"

export class Player {
    websocket: WebSocket;
    score: number;
    constructor(websocket: WebSocket) {
        this.websocket = websocket
        this.score = 0
    }

    increment_score(): void{
        this.score++;
    }
}