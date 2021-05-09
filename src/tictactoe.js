export class TicTacToe {
  #_size
  #_turn
  #squares

  constructor(size) {
    if (size < 3 || size % 2 !== 1) {
      throw new TypeError(`The argument size: '${size}' is not valid for tic tac toe (3, 5, 7, ...)`) 
    }
    this._size = size
    this.reset()
  }

  get size() {
    return this._size
  }

  reset() {
    this._turn = 0
    this.squares = Array(this.size * this.size).fill(null)
  }

  _checkSegment(startIx, stride, length) {
    const squares = this.squares
    const symbol = squares[startIx]
      
    if (symbol !== null) {
      let found = true
      startIx += stride
      for (let cIx = 1; cIx < length; cIx++, startIx += stride) {
        if (symbol !== squares[startIx]) {
          found = false
          break
        }
      }

      if (found) {
        return symbol
      }
    }

    return false
  }

  checkWinner() {
    const size = this.size

    // checks array with start and stride parameters
    let checks = [[0, size + 1], [size - 1, size - 1]]  // the diagonal checks

    // add all rows and col checks
    for (let ix = 0; ix < size; ix++) {
      checks.push([ix * size, 1])
      checks.push([ix, size])
    }

    // perform the checks
    for (let cIx = 0; cIx < checks.length; cIx++) {
      const symbol = this._checkSegment(checks[cIx][0], checks[cIx][1], size)
      if (symbol) {
        return symbol
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
    return this.squares[ix]
  }

  countPlayerSymbols(symbol) {
    return this.squares.reduce((count, sym) => sym === symbol ? count + 1 : count, 0)
  }

  getValidMoves() {
    const playerSymbol = this.getTurnSymbol()
    const allTokensUsed = this.countPlayerSymbols(playerSymbol) >= this.size

    function isValidMove(ix, turn, squares) {
      if (turn === 0 && ix === Math.floor(squares.length / 2)) {
        return false
      }
  
      return squares[ix] === null
    }

    if (allTokensUsed) {
      // first remove one token, then get all free squares
      const ret = []
      for(let i = 0; i < this.squares.length; i++) {
        if (this.getSquareSymbol(i) === playerSymbol) {
          this.squares[i] = null;
          const validMoves = this.getValidMoves() // fetches an array of arrays with valid moves
          this.squares[i] = playerSymbol

          validMoves.forEach((validMove) => {
              ret.push([ i, validMove[0] ]) // first i must be removed and then moved to ix
          })
        }
      }
      return ret
    } else {
      // all free squares are valid moves
      const ret = []
      this.squares.forEach((symbol, ix) => {
        if (isValidMove(ix, this.turn, this.squares)) {
          ret.push([ix])
        }
      })

      return ret
    }

  }

  setSquare(ix) {
    const validMoves = this.getValidMoves()
    for (let move of validMoves) {
      if (move[0] === ix) {
        if (this.squares[ix] === null) {
          this.squares[ix] = this.getTurnSymbol()
          this._turn++
        } else {
          this.squares[ix] = null
        }
        return true
      }
    }
    return false
  }
  
}