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

    const scoreX = (sut) => {
      return sut.getScore(sut.getTurnSymbol(0))
    }
    const scoreO = (sut) => {
      return sut.getScore(sut.getTurnSymbol(1))
    }

    it('should return 0 for both players on an empty board', () => {
      const sut = new TicTacToe(3)
      expect(scoreX(sut)).equal(0)
      expect(scoreO(sut)).equal(0)
    })
    it('should return 1 for first player and 0 for second player when one move is made', () => {
      const sut = new TicTacToe(3)
      sut.doMove(0)
      expect(scoreX(sut)).equal(1)
      expect(scoreO(sut)).equal(0)
    })

    it('should return 1 for first player and 1 for second player when two moves are made', () => {
      const sut = new TicTacToe(3)
      sut.doMove(0)
      sut.doMove(1)
      expect(scoreX(sut)).equal(1)
      expect(scoreO(sut)).equal(1)
    })

    it('should return 2 when a player has 2 tokens in a row', () => {
      const sut = new TicTacToe(5)
      sut.doMove(0)
      sut.doMove(1)
      sut.doMove(2)
      expect(scoreX(sut)).equal(2)
      expect(scoreO(sut)).equal(1)
    })

    it('should return 2 when a player has 2 tokens in a column', () => {
      const sut = new TicTacToe(3)
      sut.doMove(1)
      sut.doMove(2)
      sut.doMove(4)
      expect(scoreX(sut)).equal(2)
      expect(scoreO(sut)).equal(1)
    })

    it('should return 2 when a player has 2 tokens in a diagonal', () => {
      const sut = new TicTacToe(3)
      sut.doMove(8)
      sut.doMove(2)
      sut.doMove(4)
      expect(scoreX(sut)).equal(2)
      expect(scoreO(sut)).equal(1)
    })

    it('should return 1 when a player does not have 2 tokens or more in a row, column or diagonal', () => {
      const sut = new TicTacToe(5)
      sut.doMove(0)
      sut.doMove(1)
      sut.doMove(7)
      expect(scoreX(sut)).equal(1)
      expect(scoreO(sut)).equal(1)
    })
  })

  describe('getTurnSymbol', () => {
    const sut = new TicTacToe(3)
    it('should return two different symbols on odd and even turns', () => {
      expect(sut.getTurnSymbol(1)).not.to.equal(sut.getTurnSymbol(0))
    })

    it('should return the same symbol on odd turns', () => {
      expect(sut.getTurnSymbol(3)).to.equal(sut.getTurnSymbol(1))
    })

    it('should return the same symbol on even turns', () => {
      expect(sut.getTurnSymbol(10)).to.equal(sut.getTurnSymbol(8))
    })
  })

  describe('doMove', () => {
    it('should return true on all moves except middle square to the correct symbol as the first move', () => {
      const size = 3
      const middleSquare = Math.floor(size * size / 2)
      for (let square = 0; square < size * size; square++) {
        if (square != middleSquare) {
          const sut = new TicTacToe(size)
          expect(sut.doMove(square)).to.equal(true)
        }
      }
    })

    it(`should set the '${new TicTacToe(3).getTurnSymbol()}' symbol on all first moves`, () => {
      const size = 3
      const middleSquare = Math.floor(size * size / 2)
      for (let square = 0; square < size * size; square++) {
        if (square != middleSquare) {
          const sut = new TicTacToe(size)
          sut.doMove(square)
          expect(sut.getSquareSymbol(square)).to.equal(sut.getTurnSymbol(0))
        }
      }
    })

    it(`should set the '${new TicTacToe(3).getTurnSymbol(1)}' symbol on all second moves`, () => {
      const size = 3
      for (let square = 1; square < size * size; square++) {
        const sut = new TicTacToe(size)
        sut.doMove(0)
        sut.doMove(square)
        expect(sut.getSquareSymbol(square)).to.equal(sut.getTurnSymbol(1))  
      }
    })

    it('should return false on the middle square as the first move', () => {
      const size = 3
      const middleSquare = Math.floor(size * size / 2)
      const sut = new TicTacToe(size)
      expect(sut.doMove(middleSquare)).to.equal(false)
    })

    it('should not set the middle square as the first move', () => {
      const size = 3
      const middleSquare = Math.floor(size * size / 2)
      const sut = new TicTacToe(size)
      const expected = sut.getSquareSymbol(middleSquare)
      sut.doMove(middleSquare) 
      expect(sut.getSquareSymbol(middleSquare)).to.equal(expected)
    })

    it(`should accept a 'from - to' move after all tokens are placed`, () => {
      const size = 3
      
      const sut = new TicTacToe(size)
      for (let square = 0; square < size * 2; square++) {
        sut.doMove(square)
      }
      // XOX
      // OXO
      // ---

      expect(sut.doMove({from: 0, to:6})).to.equal(true)
    })

    it(`should not accept a integer move after all tokens are placed`, () => {
      const size = 3
      
      const sut = new TicTacToe(size)
      for (let square = 0; square < size * 2; square++) {
        sut.doMove(square)
      }
      // XOX
      // OXO
      // ---

      expect(sut.doMove(6)).to.equal(false)
    })

    it(`should accept a remove move after all tokens are placed`, () => {
      const size = 3
      
      const sut = new TicTacToe(size)
      for (let square = 0; square < size * 2; square++) {
        sut.doMove(square)
      }
      // XOX
      // OXO
      // ---

      expect(sut.doMove(6)).to.equal(false)
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