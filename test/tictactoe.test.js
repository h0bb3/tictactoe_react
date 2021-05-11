import chai from 'chai'

import {TicTacToe} from '../src/tictactoe.js'

const expect = chai.expect

describe('TicTacToe', () => {
  describe('construct', () => {
    it('should set the correct size', () => {
      const sut = new TicTacToe(3)
      expect(3).to.equal(sut.size)
    })

    const errorSizes = [-17, 0, 1, 2]
    errorSizes.forEach(size => {
      it('should cast an exception on an erroneous size', () => {
        expect(() => {new TicTacToe(size)}).to.throw(Error)   
      })
    })
    
    resetTest()
    
  })

  describe('reset', resetTest)


})

function resetTest() {
  it('should initialize the squares to the correct amount of null values', () => {
    const size = 3
    const sut = new TicTacToe(size)
    for (let i = 0; i < size*size; i++) {
      expect(null).to.equal(sut.getSquareSymbol(i))
    }
    expect(undefined).to.equal(sut.getSquareSymbol(size*size))
  })

  it('should set turn to 0', () => {
    const sut = new TicTacToe(3)
    expect(0).to.equal(sut.turn)
  })
}