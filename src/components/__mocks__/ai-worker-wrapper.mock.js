import { doNegimaxMove } from '../../model/tictactoe-ai.js'
import { TicTacToe } from '../../model/tictactoe.js'

export class AiWorkerWrapper {


  postMessage(event) {
    this.postMessageEvent = event

    const game = TicTacToe.createFrom(event.gameSquares, event.turn)
    const move = doNegimaxMove(game)
    if (move.from !== undefined) {
      this.addEventListenerArgs.callback({data:{ix: move.from}})
    }
    if (move.to !== undefined) {
      this.addEventListenerArgs.callback({data: {ix: move.to}})
    }

  }

  addEventListener(msg, callback) {
    this.addEventListenerArgs = {msg: msg, callback:callback}
  }
}
