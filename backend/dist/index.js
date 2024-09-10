"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', (ws) => { connection(ws); });
function connection(ws) {
    gameManager.addUser(ws);
    console.log("User added");
    ws.on("discoonect", () => gameManager.removeUser(ws));
}
// const wss = new WebSocketServer({ port: 8080 });
// const gameManager = new GameManager();
// wss.on('connection', function connection(ws) {
//   gameManager.addUser(ws);
//   console.log("Hello")
//   ws.on("disconnect", () => gameManager.removeUser(ws));}
// )
