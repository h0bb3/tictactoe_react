import {mount} from "enzyme";
import {Game} from '../game/game-component'

describe('<Game/>', () => {

  it('renders some html', () => {
    const wrapper = mount(<Game/>)
    expect(wrapper.html().length).toBeGreaterThan(0)
  })

})