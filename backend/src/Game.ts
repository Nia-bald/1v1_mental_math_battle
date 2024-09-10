import WebSocket from "ws"


export class Game {
    player1 : WebSocket
    player2 : WebSocket

    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1
        this.player2 = player2
        this.player1.send(JSON.stringify(
            {type:"INIT_GAME",
             text:"GAME_STARTED"
            }
        ))
        this.player2.send(JSON.stringify(
            {type:"INIT_GAME",
             text:"GAME_STARTED"
            }
        ))

    }
}