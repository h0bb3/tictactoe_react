export class TicTacToe {

  constructor() {
    this._size = 3
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

  setSquare(ix) {
    const squares = this.squares
    const turn = this.turn
    if (squares[ix] === null) {
      if (turn === 0 && ix === Math.floor(this.size * this.size / 2)) {
        return
      }
      squares[ix] = this.getTurnSymbol(turn)
      this._turn++
    }
  }
  
}