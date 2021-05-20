import {shallow} from "enzyme";
import {HighscoresComponent} from '../highscores/highscores-component'

describe('<HigscoreComponent>', () => {
  it("renders some html on an empty list of scores", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[]}}/>)
    expect(wrapper.html().length).toBeGreaterThan(1)
  })

  it("renders one table", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[]}}/>)
    expect(wrapper.find('table')).toHaveLength(1)
  })

  it("renders one header for an empty list of scores", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[]}}/>)
    expect(wrapper.find('thead')).toHaveLength(1)
  })

  it("renders one body for an empty list of scores", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[]}}/>)
    expect(wrapper.find('tbody')).toHaveLength(1)
  })

  it("renders three header columns", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[]}}/>)
    expect(wrapper.find('th')).toHaveLength(3)
  })

  it("renders three rows for a list of two scores", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[{time:"a b c d e"},{time:"a b c d e"}]}}/>)
    expect(wrapper.find('tr')).toHaveLength(3)
  })

  it("renders the rows in order", () => {
    const wrapper = shallow(<HighscoresComponent scores={{scores:[{name:'first', time:"a b c d e"},{name:'second', time:"a b c d e"}]}}/>)
    const rows = wrapper.find('tr') 
    expect(wrapper.find('tr')).toHaveLength(3)
    expect(rows.at(1).contains(<td>first</td>)).toEqual(true)
    expect(rows.at(2).contains(<td>second</td>)).toEqual(true)
  })

})