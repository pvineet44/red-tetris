import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";

import Display from '../components/Display';

it("Display test", () => {
    const wrapper = shallow(<Display gameOver={false} text={'Hello'} />)
    expect(wrapper.text()).toContain('Hello')
})