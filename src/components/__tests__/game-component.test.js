import {mount} from "enzyme";
import {Game} from '../game/game-component'

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

describe('<Game/>', () => {

  it('renders some html', () => {
    const wrapper = mount(<Game localStorage={new StorageMock()}/>)
    expect(wrapper.html().length).toBeGreaterThan(0)
  })

  it('includes one Board component', () => {
    const wrapper = mount(<Game localStorage={new StorageMock()}/>)
    expect(wrapper.find('BoardComponent')).toHaveLength(1)
  })

  it('includes one Highscores component', () => {
    const wrapper = mount(<Game localStorage={new StorageMock()}/>)
    expect(wrapper.find('HighscoresComponent')).toHaveLength(1)
  })

  it ('should accept click events from the board squares and set the corresponding game square', () => {
    const wrapper = mount(<Game localStorage={new StorageMock()}/>)
    const board = wrapper.find('BoardComponent')
    const buttons = board.find('button')
    const game = wrapper.state().game

    buttons.at(8).simulate('click')
    expect(game.getSquareSymbol(8)).toEqual(game.getTurnSymbol(0))
  })

  it ('should let the ai play as the second player', () => {
    const wrapper = mount(<Game localStorage={new StorageMock()}/>)
    const board = wrapper.find('BoardComponent')
    const buttons = board.find('button')
    const game = wrapper.state().game

    jest.useFakeTimers()
    buttons.at(8).simulate('click') // human move
    jest.advanceTimersByTime(wrapper.aiWaitTime)
    
    expect(game.countPlayerSymbols(game.getTurnSymbol(1))).toEqual(1)
  })

  it ('has an ai that does not crash', () => {
    const wrapper = mount(<Game localStorage={new StorageMock()}/>)
    const board = wrapper.find('BoardComponent')
    const buttons = board.find('button')
    const game = wrapper.state().game

    jest.useFakeTimers()
    buttons.at(8).simulate('click') // human move
    jest.advanceTimersByTime(wrapper.aiWaitTime)
    
    expect(game.countPlayerSymbols(game.getTurnSymbol(1))).toEqual(1)
  })

  describe('onNameSubmitted', () => {
    it('adds a name to the highscore state and sets the newScore state to undefined', () => {
      const wrapper = mount(<Game localStorage={new StorageMock()}/>)
      wrapper.instance().onNameSubmitted('a', 17)
      expect(wrapper.state().scores.scores.length).toEqual(1)
      expect(wrapper.state().newScore).toBeUndefined()
    })

    it('only changes newScore state if the name and score is accepted', () => {
      const wrapper = mount(<Game localStorage={new StorageMock()}/>)
      wrapper.state().newScore = 17
      wrapper.instance().onNameSubmitted('', 17)
      expect(wrapper.state().scores.scores.length).toEqual(0)
      expect(wrapper.state().newScore).toEqual(17)
    })
  })

})