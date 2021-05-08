export class TicTacToe {

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

  getTurnSymbol() {
    return this.turn % 2 === 0 ? 'X' : 'O'
  }

  getSquare(ix) {
    return this.squares[ix]
  }

  countPlayerSymbols(symbol) {
    return this.squares.reduce((count, sym) => sym === symbol ? count + 1 : count, 0)
  }

  setSquare(ix) {
    const squares = this.squares
    const turn = this.turn
    const allTokensUsed = this.countPlayerSymbols(this.getTurnSymbol()) >= this.size
    const symbol = squares[ix]

    if (symbol === null) {

      // do not allow to place in the middle as the first move
      if (turn === 0 && ix === Math.floor(this.size * this.size / 2)) {
        return false
      }

      if (allTokensUsed) {
        return false
      }

      squares[ix] = this.getTurnSymbol()
      this._turn++
      return true
    } else if (allTokensUsed && symbol === this.getTurnSymbol()) {
      squares[ix] = null
      return true
    }

    return false
  }
  
}