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

  describe('from', () => {
    it('should not return the same object as the source', () => {
      const sut = new TicTacToe(3)
      expect(sut.from()).not.to.equal(sut)
    })

    it('should copy the size', () => {
      const sut = new TicTacToe(3)
      expect(sut.from().size).to.equal(sut.size)
    })

    it('should copy the turn value', () => {
      const sut = new TicTacToe(3)
      sut.doMove(0)
      expect(sut.from().turn).to.equal(sut.turn)
    })

    it ('should not have the same squares object as the source', () => {
      const sut = new TicTacToe(3)
      expect(sut.from()._squares).not.to.equal(sut._squares)
    })

    it ('should have the same squares values as the source', () => {
      const size = 3
      const sut = new TicTacToe(size)
      sut.doMove(0)
      sut.doMove(8)
      const copy = sut.from()
      for (let i = 0; i < size*size; i++) {
        expect(sut.getSquareSymbol(i)).to.equal(copy.getSquareSymbol(i))
      }
    })
  })

  describe('getScore', () => {
    it('should return 0 for both players on an empty board', () => {
      const sut = new TicTacToe(3)
      expect(0).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(0).equal(sut.getScore(sut.getTurnSymbol(1)))
    })
    it('should return 1 for first player and 0 for second player when one move is made', () => {
      const sut = new TicTacToe(3)
      sut.doMove(0)
      expect(1).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(0).equal(sut.getScore(sut.getTurnSymbol(1)))
    })

    it('should return 1 for first player and 1 for second player when two moves are made', () => {
      const sut = new TicTacToe(3)
      sut.doMove(0)
      sut.doMove(1)
      expect(1).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(1).equal(sut.getScore(sut.getTurnSymbol(1)))
    })

    it('should return 2 when a player has 2 tokens in a row', () => {
      const sut = new TicTacToe(5)
      sut.doMove(0)
      sut.doMove(1)
      sut.doMove(2)
      expect(2).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(1).equal(sut.getScore(sut.getTurnSymbol(1)))
    })

    it('should return 2 when a player has 2 tokens in a column', () => {
      const sut = new TicTacToe(3)
      sut.doMove(1)
      sut.doMove(2)
      sut.doMove(4)
      expect(2).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(1).equal(sut.getScore(sut.getTurnSymbol(1)))
    })

    it('should return 2 when a player has 2 tokens in a diagonal', () => {
      const sut = new TicTacToe(3)
      sut.doMove(8)
      sut.doMove(2)
      sut.doMove(4)
      expect(2).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(1).equal(sut.getScore(sut.getTurnSymbol(1)))
    })

    it('should return 1 when a player does not have 2 tokens or more in a row, column or diagonal', () => {
      const sut = new TicTacToe(5)
      sut.doMove(0)
      sut.doMove(1)
      sut.doMove(7)
      expect(1).equal(sut.getScore(sut.getTurnSymbol(0)))
      expect(1).equal(sut.getScore(sut.getTurnSymbol(1)))
    })
  })

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