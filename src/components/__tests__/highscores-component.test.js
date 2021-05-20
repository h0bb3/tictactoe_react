import {shallow, mount } from "enzyme";
import {HighscoresComponent} from '../highscores/highscores-component'


it("renders without crashing", () => {
  shallow(<HighscoresComponent scores={{scores:[]}}/>);
})