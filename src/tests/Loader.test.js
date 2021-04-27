import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";

import Loader from '../components/Loader';

it("Display test", () => {
    const wrapper = shallow(<Loader />)
    expect(wrapper.text()).toContain('Loading Tetris')
})