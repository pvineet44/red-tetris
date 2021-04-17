import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

import React from "react";
import App from "../App";
import Welcome from "../components/Welcome";

it("renders without crashing", () => {
  const changeSize = jest.fn();
    const app = shallow(<App />);

    // const appInstance = app.instance();
    // console.log(appInstance)
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<Welcome />);
    // expect(wrapper.find('div').text()).toContain('Increment')
    expect(wrapper.find('h1').text()).toContain('Tetris')
  });

//   test('Decrement Button Test', ()=> {
//     const counterWrapper = shallow(<Counter/>)
//     expect(counterWrapper.find('p').text()).toEqual('0')

//     const wrapper = shallow(<Buttons count = {0} setCount={(count) => { count = count - 1}}/>)
//     wrapper.find('.decrement-button').simulate('click')
//     expect(counterWrapper.find('p').text()).toEqual('0')
// })

