export class TicTacToe {
  #_size
  #_turn
  #_squares

  constructor(size) {
    if (size < 3 || size % 2 !== 1) {
      throw new Error(`The argument size: '${size}' is not valid for tic tac toe (3, 5, 7, ...)`) 
    }
    this._size = size
    this.reset()
  }

  get size() {
    return this._size
  }

  from() {
    const ret = new TicTacToe(this.size)
    ret._turn = this.turn
    for (let i = 0; i < this._squares.length; i++) {
      ret._squares[i] = this._squares[i]
    }

    return ret
  }

  reset() {
    this._turn = 0
    this._squares = Array(this.size * this.size).fill(null)
  }

  _scoreSegment(startIx, stride, length, symbol = this._squares[startIx]) {
    const _squares = this._squares
    let score = 0
      
    for (let cIx = 0; cIx < length; cIx++, startIx += stride) {
      if (symbol === _squares[startIx]) {
        score++
      }
    }

    return score
  }

  _getChecks() {
    const size = this.size
    // checks array with start and stride parameters
    let checks = [[0, size + 1], [size - 1, size - 1]]  // the diagonal checks

    // add all rows and col checks
    for (let ix = 0; ix < size; ix++) {
      checks.push([ix * size, 1])
      checks.push([ix, size])
    }

    return checks
  }

  getScore(playerSymbol) {
    const checks = this._getChecks()
    let maxScore = 0
    const size = this.size

    for (let cIx = 0; cIx < checks.length; cIx++) {
      const score = this._scoreSegment(checks[cIx][0], checks[cIx][1], size, playerSymbol)
      if (score > maxScore) {
        maxScore = score
      }
    }

    return maxScore
  }

  checkWinner() {
    const size = this.size
    const checks = this._getChecks()
    

    // perform the checks
    for (let cIx = 0; cIx < checks.length; cIx++) {
      if (this._scoreSegment(checks[cIx][0], checks[cIx][1], size) === size) {
        return this._squares[checks[cIx][0]]
      }
    }

    return false
  }

  get turn() {
    return this._turn
  }

  getTurnSymbol(turn = this.turn) {
    return turn % 2 === 0 ? 'X' : 'O'
  }

  getSquareSymbol(ix) {
    return this._squares[ix]
  }

  countPlayerSymbols(symbol) {
    return this._squares.reduce((count, sym) => sym === symbol ? count + 1 : count, 0)
  }

  getValidMoves() {
    const playerSymbol = this.getTurnSymbol()
    const allTokensUsed = this.countPlayerSymbols(playerSymbol) >= this.size

    function isValidMove(ix, turn, _squares) {
      if (turn === 0 && ix === Math.floor(_squares.length / 2)) {
        return false
      }
  
      return _squares[ix] === null
    }

    if (allTokensUsed) {
      // first remove one token, then get all free squares
      const ret = []
      for(let i = 0; i < this._squares.length; i++) {
        if (this.getSquareSymbol(i) === playerSymbol) {
          this._squares[i] = null;
          const validMoves = this.getValidMoves() // fetches an array of arrays with valid moves
          this._squares[i] = playerSymbol

          validMoves.forEach((validMove) => {
            if (i !== validMove[0]) {
              ret.push([ i, validMove[0] ]) // first i must be removed and then moved to ix
            }
          })
        }
      }
      return ret
    } else {
      // all free squares are valid moves
      const ret = []
      this._squares.forEach((symbol, ix) => {
        if (isValidMove(ix, this.turn, this._squares)) {
          ret.push([ix])
        }
      })

      return ret
    }
  }

  doMove(aMove) {
    if (Number.isInteger(aMove)) {
      aMove = {to:aMove}
    }
    const validMoves = this.getValidMoves()
    for (let move of validMoves) {
      if (aMove.from !== undefined) {
        if (move.length === 2 && aMove.from === move[0] && aMove.to === move[1]) {
          this._squares[aMove.from] = null
          this._squares[aMove.to] = this.getTurnSymbol()
          this._turn++
          return true
        }
      } else {
        if (move[0] === aMove.to) {
          const ix = aMove.to
          if (this._squares[ix] === null) {
            this._squares[ix] = this.getTurnSymbol()
            this._turn++
          } else {
            this._squares[ix] = null
          }
          return true
        }
      }
    }
    return false
  }

  _setSquare(ix, value = this.getTurnSymbol()) {
    this._squares[ix] = value
  }
  
}