"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(ws) {
        this.users.push(ws);
        this.addHandler(ws);
    }
    removeUser(ws) {
        this.users = this.users.filter(user => user != ws);
    }
    addHandler(ws) {
        ws.on("message", data => {
            const message = JSON.parse(data.toString());
            if (message.type == "INIT_GAME") {
                if (this.pendingUser && this.pendingUser != ws) {
                    this.games.push(new Game_1.Game(this.pendingUser, ws));
                }
                else {
                    this.pendingUser = ws;
                    ws.send(JSON.stringify({ type: "INIT_GAME", text: "Looking for opponent" }));
                }
            }
        });
    }
}
exports.GameManager = GameManager;
// export class GameManager {
//     private games: Game[];
//     private pendingUser: WebSocket | null;
//     private users: WebSocket[];
//     constructor() {
//         this.games = [];
//         this.pendingUser = null;
//         this.users = []
//     }
//     addUser(socket: WebSocket) {
//         this.users.push(socket);
//         this.addHandler(socket);
//     }
//     removeUser(socket: WebSocket) {
//         this.users = this.users.filter(user => user !== socket);
//     }
//     private addHandler(socket: WebSocket) {
//             // Earlier I was wondering how is it that it is exuting the piece of code below without ever executing addHandler first
//         // Now I understand that the below piece of code is basically saying execute this piece of the code for this socket if you ever get "message" in this socket
//         // can be treated as assigning functions to websocket
//         socket.on("message", (data) => {
//             const message = JSON.parse(data.toString());
//             if (message.type == INIT_GAME){
//                 if (this.pendingUser && this.pendingUser != socket){
//                     const game = new Game(this.pendingUser, socket);
//                     this.games.push(game);
//                     this.pendingUser = null;
//                     //start a game
//                 } else {
//                     this.pendingUser = socket;
//                 }
//             }
//             if (message.type === MOVE){
//                 const game = this.games.find(game => game.player1 == socket || game.player2 == socket);
//                 if (game) {
//                     game.makeMove(socket, message.move);
//                 }
//             }
//         })
//     }
// }
