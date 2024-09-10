import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import WebSocket from 'ws';

const wss = new WebSocketServer({port:8080});

const gameManager = new GameManager()

wss.on('connection', (ws) => {connection(ws);});


function connection(ws: WebSocket){
    gameManager.addUser(ws);
    console.log("User added")
    ws.on("discoonect", () => gameManager.removeUser(ws));
}





// const wss = new WebSocketServer({ port: 8080 });

// const gameManager = new GameManager();

// wss.on('connection', function connection(ws) {
//   gameManager.addUser(ws);
//   console.log("Hello")
//   ws.on("disconnect", () => gameManager.removeUser(ws));}
// )
