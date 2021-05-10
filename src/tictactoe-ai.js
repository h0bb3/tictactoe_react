import { TicTacToe } from "./tictactoe"

export function doRandomMove(tttGame) {
  if (!tttGame instanceof TicTacToe) {
    throw new TypeError('argument tttGame is not an instance of TicTacToe')
  }

  const validMoves = tttGame.getValidMoves()
  let validMove
  do {
    validMove = validMoves[Math.floor(Math.random() * validMoves.length)]
  } while (validMove[0] === validMove[1]) // we discard movement from and to the same square
  tttGame.doMove(validMove)
}

export function doMinMaxMove(tttGame) {
  if (!tttGame instanceof TicTacToe) {
    throw new TypeError('argument tttGame is not an instance of TicTacToe')
  }

  const tttGameCopy = tttGame.from()
  const maxDepth = tttGame.size < 5 ? 6 : 2
  const validMove = getMove(tttGameCopy, 0, maxDepth)
  if (Array.isArray(validMove)) {
    tttGame.doMove(validMove[1])
  } else {
    console.log("AI is screwed... doing random move")
    doRandomMove(tttGame)
  }
  
}

function getMove(tttGame, depth, maxDepth) {

  const validMoves = tttGame.getValidMoves()

  const tieMoves = []

  for (let i = 0; i < validMoves.length; i++) {
    const score = scoreMove(tttGame.from(), validMoves[i])
    if (score === 1) {
      // this would be a win for me so I would go for it
      return [1, validMoves[i]]
    } else if (score === 0) {
      // I'm not a winner by this move so better check what the opponent would do if I did this
      if (depth + 1 < maxDepth) {
        const tttGameCopy = tttGame.from()
        tttGameCopy.doMove(validMoves[i])

        const opponentMove = getMove(tttGameCopy, depth + 1, maxDepth)
        if (Array.isArray(opponentMove)) {
          // opponent does not seem to be able to win if I do this so we have a potential move
          if (opponentMove[0] === 0) {
            tieMoves.push([0, validMoves[i]])
          }
        } else {
          // opponent has no valid moves this is good
          return [1, validMoves[i]]
        }
      } else {
        // recursion depth met so we must take a chance on this
        tieMoves.push([0, validMoves[i]])
      }
    }
  }

  // just select a random move from the ties
  return tieMoves[Math.floor(Math.random() * tieMoves.length)]
}

function scoreMove(tttGame, validMove) {
  tttGame.doMove(validMove)
  if (!tttGame.checkWinner()) {
    return 0
  }
  return 1
}