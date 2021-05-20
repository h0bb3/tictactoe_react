import {shallow} from "enzyme";
import {NameFormComponent} from '../nameform/nameform-component'

describe('<NameFormComponent>', () => {
  it("renders some html", () => {
    const wrapper = shallow(<NameFormComponent />)
    expect(wrapper.html().length).toBeGreaterThan(1)
  })

  it("has a text input", () => {
    const wrapper = shallow(<NameFormComponent />)
    const textinput = wrapper.find('input')
    expect(textinput).toHaveLength(1)
  })

  it("handles input change events", () => {
    const wrapper = shallow(<NameFormComponent />)
    const textinput = wrapper.find('input')
    const expected = 'This is just for test'

    textinput.simulate('change', {target: {value: expected}})
    expect(wrapper.state().value).toEqual(expected)
  })

  it("issues onNameSubmitted property callback function on input submit events", () => {
    let actualName = 'not set'
    const wrapper = shallow(<NameFormComponent onNameSubmitted={(name) => {actualName = name}}/>)
    const form = wrapper.find('form')
    const textinput = wrapper.find('input')
    const expected = 'This is just for test'

    textinput.simulate('change', {target: {value: expected}})
    form.simulate('submit', {preventDefault: () => {}})
    expect(actualName).toEqual(expected)
  })

})