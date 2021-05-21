import {mount} from "enzyme";
import {Game} from '../game/game-component'

describe('<Game/>', () => {

  it('renders some html', () => {
    const wrapper = mount(<Game/>)
    expect(wrapper.html().length).toBeGreaterThan(0)
  })

  it('includes one Board component', () => {
    const wrapper = mount(<Game/>)
    expect(wrapper.find('BoardComponent')).toHaveLength(1)
  })

  it('includes one Highscores component', () => {
    const wrapper = mount(<Game/>)
    expect(wrapper.find('HighscoresComponent')).toHaveLength(1)
  })

  it ('should accept click events from the board squares and set the corresponding game square', () => {
    const wrapper = mount(<Game/>)
    const board = wrapper.find('BoardComponent')
    const buttons = board.find('button')
    const game = wrapper.state().game

    buttons.at(8).simulate('click')
    expect(game.getSquareSymbol(8)).toEqual(game.getTurnSymbol(0))
  })

  it ('should let the ai play as the second player', () => {
    const wrapper = mount(<Game noAITimer={true}/>)
    const board = wrapper.find('BoardComponent')
    const buttons = board.find('button')
    const game = wrapper.state().game

    buttons.at(8).simulate('click') // human move
    
    expect(game.countPlayerSymbols(game.getTurnSymbol(1))).toEqual(1)
  })

})