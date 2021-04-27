import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";

import StartButton from '../components/StartButton';

it("StartButton test", () => {
    const mockfn = jest.fn();
    const wrapper = shallow(<StartButton callback = {mockfn} text = {'Start Button'} disabled = {false} />)
    expect(wrapper.text()).toContain('Start Button')
})