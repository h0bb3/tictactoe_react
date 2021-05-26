import { doNegimaxMove } from '../../model/tictactoe-ai.js'
import { TicTacToe } from '../../model/tictactoe.js'

onmessage = function(event) {
  const game = TicTacToe.createFrom(event.data.gameSquares, event.data.turn)
  const move = doNegimaxMove(game)
  if (move.from !== undefined) {
    this.self.postMessage({ix: move.from})
  }
  if (move.to !== undefined) {
    this.self.postMessage({ix: move.to})
  }
}