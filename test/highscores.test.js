import chai from 'chai'

import {Highscores} from '../src/model/highscores.js'

const expect = chai.expect

class StorageMock {
  constructor() {
    this.values = {}
  }

  setItem(key, value) {
    this.values[key] = value
  }
  getItem(key, value) {
    return this.values[key]
  }
}

describe('Highscores', () => {
  describe('construct', () => {
    it('should be empty if the storage is empty', () => {
      const sut = new Highscores(new StorageMock())
      expect(0).to.equal(sut.scores.length)
    })
    
    it('should be intialized if the storage contains a json string under the key "scores"', () => {
      const storage = new StorageMock()
      storage.setItem('scores', JSON.stringify([{score:17, name:'Olle Badboll', time:Date()}]))

      const sut = new Highscores(storage)
      expect(1).to.equal(sut.scores.length)
    })
  })

  describe('addScore', () => {
    it('should store a new score', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(17, "Olle Badboll")
      expect(1).to.equal(sut.scores.length)
    })

    it('should not accept a score with a an empty name', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(17, "")
      expect(0).to.equal(sut.scores.length)
    })

    it('should not accept an undefined name', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(17)
      expect(0).to.equal(sut.scores.length)
    })

    it('should not accept an undefined score', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(undefined, "a")
      expect(0).to.equal(sut.scores.length)
    })

    it('should not accept a negative score', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(-1, "a")
      expect(0).to.equal(sut.scores.length)
    })

    it('should only accept integer scores', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(0.1, "a")
      expect(0).to.equal(sut.scores.length)
    })

    it('should sort the added score in descending order', () => {
      const storage = new StorageMock()

      const sut = new Highscores(storage)
      sut.addScore(1, "a")
      sut.addScore(2, "b")
      expect(2).to.equal(sut.scores[0].score)
      expect('b').to.equal(sut.scores[0].name)
      expect(1).to.equal(sut.scores[1].score)
      expect('a').to.equal(sut.scores[1].name)
    })
  })
  
})