import {shallow, mount} from "enzyme";
import {BoardComponent} from '../board/board-component'

function getSquareSymbol(squareIx) {
  return squareIx % 2 === 0 ? 'X' : 'O'
}

describe('<BoardComponent>', () => {

  it ('renders some html', () => {
    const wrapper = shallow(<BoardComponent size={3} getSquareSymbol={getSquareSymbol}/>)
    expect(wrapper.html().length).toBeGreaterThan(1)
  })


  it ('renders size x size squares', () => {
    const size = 6
    const wrapper = mount(<BoardComponent size={size} getSquareSymbol={getSquareSymbol}/>)
    expect(wrapper.find('Zquare')).toHaveLength(size * size)
  })

  it ('renders size rows', () => {
    const size = 5
    const wrapper = mount(<BoardComponent size={size} getSquareSymbol={getSquareSymbol}/>)
    expect(wrapper.find('.board-row')).toHaveLength(size)
  })

  it ('accepts onClick events and forwards the square index', () => {
    const size = 3
    let actualIndex = -1

    const wrapper = mount(<BoardComponent size={size} getSquareSymbol={getSquareSymbol} onClick={(ix) => {actualIndex = ix}}/>)
    const buttons = wrapper.find('button')
    for (let i = 0; i  < size * size; i++) {
      actualIndex = -1
      buttons.at(i).simulate('click')
      expect(i).toEqual(actualIndex)
    }
  })

  it ('shows the correct symbol on each square', () => {
    const size = 3

    const wrapper = mount(<BoardComponent size={size} getSquareSymbol={getSquareSymbol} />)
    const buttons = wrapper.find('button')
    for (let i = 0; i  < size * size; i++) {
      expect(buttons.at(i).text()).toEqual(getSquareSymbol(i))
    }
  })

})